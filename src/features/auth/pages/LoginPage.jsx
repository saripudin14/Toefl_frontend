import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon } from "lucide-react";
import { GuestLayout } from "../../../components/layout/GuestLayout";
import { Logo } from "../../../components/ui/Logo";
import { Input } from "../../../components/ui/Input";
import { PasswordInput } from "../../../components/ui/PasswordInput";
import { Select } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { useAuth } from "../auth-context";
import { useForm } from "../../../hooks/useForm";
import { ERROR_MESSAGES } from "../../../lib/constants";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");

  const { values, errors, handleChange, handleSubmit, isSubmitting, setValues } = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberSession: false,
    },
    validate: (vals) => {
      const errs = {};
      if (!vals.email) {
        errs.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
        errs.email = "Please enter a valid email address";
      }
      if (!vals.password) {
        errs.password = "Password is required";
      }
      return errs;
    },
    onSubmit: async (vals) => {
      setAuthError("");
      try {
        await login(vals.email, vals.password, vals.rememberSession);
        navigate("/dashboard");
      } catch (error) {
        setAuthError(error.message || ERROR_MESSAGES.INVALID_CREDENTIALS);
        setValues(prev => ({ ...prev, password: "" }));
      }
    },
  });

  return (
    <GuestLayout>
      <div className="w-full flex flex-col items-center">
        <Logo variant="full" size="md" className="mb-8" />
        
        <div className="w-full text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-sm text-slate-500">Please sign in to access your dashboard.</p>
        </div>

        {authError && (
          <Alert variant="error" className="w-full mb-6">
            {authError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@university.edu"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            icon={MailIcon}
          />
          
          <PasswordInput
            label="Password"
            name="password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            headerRight={
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 hover:underline">
                Forgot Password?
              </Link>
            }
          />
          
          <div className="flex items-center">
            <input
              id="rememberSession"
              name="rememberSession"
              type="checkbox"
              checked={values.rememberSession}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
            />
            <label htmlFor="rememberSession" className="ml-2 block text-sm text-slate-700 cursor-pointer">
              Remember my session
            </label>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            loading={isSubmitting}
            showArrow
          >
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-slate-500">New candidate? </span>
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
            Create an account
          </Link>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-center space-x-4 text-xs text-slate-400">
          <Link to="#" className="hover:text-slate-600">Privacy Policy</Link>
          <span>&middot;</span>
          <Link to="#" className="hover:text-slate-600">Terms of Service</Link>
          <span>&middot;</span>
          <Link to="#" className="hover:text-slate-600 flex items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
            System Status
          </Link>
        </div>
      </div>
    </GuestLayout>
  );
}
