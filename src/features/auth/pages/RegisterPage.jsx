import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GuestNavbar } from "../../../components/layout/GuestNavbar";
import { Footer } from "../../../components/layout/Footer";
import { Input } from "../../../components/ui/Input";
import { PasswordInput } from "../../../components/ui/PasswordInput";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { RoleSelector } from "../../../components/ui/RoleSelector";
import { useForm } from "../../../hooks/useForm";
import { authApi } from "../api/auth-api";
import { MailIcon, UserIcon, PhoneIcon } from "lucide-react";

const validateForm = (values) => {
  const errors = {};

  if (!values.name?.trim()) {
    errors.name = "Full name is required";
  }

  if (!values.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.phone?.trim()) {
    errors.phone = "Phone number is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!values.role) {
    errors.role = "Please select a role";
  }

  return errors;
};

export function RegisterPage() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { values, errors, handleChange, handleSubmit, isSubmitting, setValues } = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "PENGGUNA_BELAJAR",
    },
    validate: validateForm,
    onSubmit: async (formValues) => {
      setApiError(null);
      setSuccessMessage(null);

      try {
        const response = await authApi.register({
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          password: formValues.password,
          role: formValues.role,
        });

        if (response.success) {
          setSuccessMessage("Account created successfully! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        setApiError(error.message || "Registration failed. Please try again.");
      }
    },
  });

  const handleRoleChange = (roleId) => {
    setValues((prev) => ({ ...prev, role: roleId }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <GuestNavbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Decorative Blue Circle */}
        <div className="absolute -left-32 top-1/4 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>

        <div className="w-full max-w-2xl relative z-10">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
              <p className="text-slate-600">Join the professional platform for TOEFL success.</p>
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
              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full legal name"
                icon={UserIcon}
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                disabled={isSubmitting}
              />

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

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                icon={PhoneIcon}
                value={values.phone}
                onChange={handleChange}
                error={errors.phone}
                disabled={isSubmitting}
              />

              <RoleSelector value={values.role} onChange={handleRoleChange} error={errors.role} />

              <PasswordInput
                label="Password"
                name="password"
                placeholder="Min. 8 characters"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
                disabled={isSubmitting}
              />

              <PasswordInput
                label="Confirm Password"
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
                Register Now
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Back to Login
                </Link>
              </p>
              <p className="text-xs text-slate-500">
                By registering, you agree to our{" "}
                <Link to="/terms-of-service" className="text-blue-600 hover:text-blue-700">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
