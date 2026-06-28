import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GuestNavbar } from "../../../components/layout/GuestNavbar";
import { Footer } from "../../../components/layout/Footer";
import { Input } from "../../../components/ui/Input";
import { PasswordInput } from "../../../components/ui/PasswordInput";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { useForm } from "../../../hooks/useForm";
import { authApi } from "../api/auth-api";
import { KeyIcon } from "lucide-react";

const validateForm = (values) => {
  const errors = {};

  if (!values.token?.trim()) {
    errors.token = "Reset token is required";
  }

  if (!values.newPassword) {
    errors.newPassword = "New password is required";
  } else if (values.newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [tokenFromUrl, setTokenFromUrl] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setTokenFromUrl(token);
    }
  }, [searchParams]);

  const { values, errors, handleChange, handleSubmit, isSubmitting, setValues } = useForm({
    initialValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: validateForm,
    onSubmit: async (formValues) => {
      setApiError(null);
      setSuccessMessage(null);

      const tokenToUse = tokenFromUrl || formValues.token;

      try {
        const response = await authApi.resetPassword(tokenToUse, formValues.newPassword);

        if (response.success) {
          setSuccessMessage("Password reset successfully! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        setApiError(error.message || "Password reset failed. Please try again.");
      }
    },
  });

  useEffect(() => {
    if (tokenFromUrl) {
      setValues((prev) => ({ ...prev, token: tokenFromUrl }));
    }
  }, [tokenFromUrl, setValues]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <GuestNavbar variant="minimal" />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                <KeyIcon className="w-8 h-8" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Reset Your Password</h1>
              <p className="text-slate-600">Enter your new password below</p>
            </div>

            {apiError && (
              <Alert variant="error" className="mb-6">
                {apiError}
              </Alert>
            )}

            {successMessage && (
              <Alert variant="success" className="mb-6">
                {successMessage}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Show token input only if no token in URL */}
              {!tokenFromUrl && (
                <Input
                  label="Reset Token"
                  name="token"
                  type="text"
                  placeholder="Enter your reset token"
                  value={values.token}
                  onChange={handleChange}
                  error={errors.token}
                  disabled={isSubmitting}
                  helperText="Copy the token from the email or URL"
                />
              )}

              {tokenFromUrl && (
                <Alert variant="info" className="text-sm">
                  Reset token detected from URL. Ready to set new password.
                </Alert>
              )}

              <PasswordInput
                label="New Password"
                name="newPassword"
                placeholder="Min. 8 characters"
                value={values.newPassword}
                onChange={handleChange}
                error={errors.newPassword}
                disabled={isSubmitting}
              />

              <PasswordInput
                label="Confirm New Password"
                name="confirmPassword"
                placeholder="Repeat your password"
                value={values.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                disabled={isSubmitting}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Reset Password
              </Button>
            </form>

            {/* Back to Sign In */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
