import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GuestNavbar } from "../../../components/layout/GuestNavbar";
import { Footer } from "../../../components/layout/Footer";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { useForm } from "../../../hooks/useForm";
import { authApi } from "../api/auth-api";
import { MailIcon, RefreshCwIcon, LockIcon, ArrowLeftIcon } from "lucide-react";

const validateForm = (values) => {
  const errors = {};

  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  return errors;
};

export function ForgotPasswordPage() {
  const [apiMessage, setApiMessage] = useState(null);
  const [resetToken, setResetToken] = useState(null);
  const isDevelopment = import.meta.env.MODE === "development";

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    initialValues: {
      email: "",
    },
    validate: validateForm,
    onSubmit: async (formValues) => {
      setApiMessage(null);
      setResetToken(null);

      try {
        const response = await authApi.forgotPassword(formValues.email);

        // Always show neutral message
        setApiMessage(
          "If an account exists with this email, you will receive a password reset link shortly."
        );

        // In development mode, show reset token if available
        if (isDevelopment && response.data?.reset_token) {
          setResetToken(response.data.reset_token);
        }
      } catch (error) {
        // Still show neutral message even on error
        setApiMessage(
          "If an account exists with this email, you will receive a password reset link shortly."
        );
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <GuestNavbar variant="minimal" />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                <RefreshCwIcon className="w-8 h-8" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Reset Your Password</h1>
              <p className="text-slate-600">
                Enter your email to receive a password reset link
              </p>
            </div>

            {/* Success/Info Message */}
            {apiMessage && (
              <Alert variant="info" className="mb-6">
                {apiMessage}
              </Alert>
            )}

            {/* Development Mode: Show Reset Token */}
            {isDevelopment && resetToken && (
              <Alert variant="warning" className="mb-6">
                <div className="space-y-2">
                  <p className="font-semibold">🔧 Development Mode - Reset Token:</p>
                  <code className="block p-2 bg-slate-100 rounded text-xs break-all">
                    {resetToken}
                  </code>
                  <Link
                    to={`/reset-password?token=${resetToken}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-block mt-2"
                  >
                    → Use this token to reset password
                  </Link>
                </div>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="name@example.com"
                icon={MailIcon}
                value={values.email}
                onChange={handleChange}
                error={errors.email}
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
                Send Reset Link
              </Button>
            </form>

            {/* Back to Sign In */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>

            {/* Security Note */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                <LockIcon className="w-3 h-3" />
                Secure academic portal. Your data is encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
