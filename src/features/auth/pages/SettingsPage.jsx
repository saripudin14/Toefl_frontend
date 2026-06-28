import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../../components/ui/Alert";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { PasswordInput } from "../../../components/ui/PasswordInput";
import { Badge } from "../../../components/ui/Badge";
import { useForm } from "../../../hooks/useForm";
import { useAuth } from "../auth-context";
import { authApi } from "../api/auth-api";
import {
  UserIcon,
  ShieldIcon,
  BellIcon,
  CreditCardIcon,
  MailIcon,
  PhoneIcon,
  CheckCircleIcon,
  CalendarIcon,
  PencilIcon,
} from "lucide-react";
import { cn } from "../../../lib/utils";

const tabs = [
  { id: "personal", label: "Personal Info", icon: UserIcon },
  { id: "security", label: "Security", icon: ShieldIcon },
  { id: "notifications", label: "Notifications", icon: BellIcon, comingSoon: true },
  { id: "subscription", label: "Subscription", icon: CreditCardIcon, comingSoon: true },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const { user, updateUser } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Account Settings</h1>
        <p className="text-slate-600">
          Manage your personal information and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => !tab.comingSoon && setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : tab.comingSoon
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-slate-700 hover:bg-slate-100"
                  )}
                  disabled={tab.comingSoon}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1">{tab.label}</span>
                  {tab.comingSoon && (
                    <Badge variant="secondary" className="text-xs">
                      Soon
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === "personal" && <PersonalInfoTab user={user} updateUser={updateUser} />}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "notifications" && <ComingSoonTab title="Notifications" />}
          {activeTab === "subscription" && <ComingSoonTab title="Subscription" />}
        </div>
      </div>
    </div>
  );
}

// Personal Info Tab Component
function PersonalInfoTab({ user, updateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await authApi.getMe();
      if (response.success && response.data) {
        setUserData(response.data);
      }
    } catch (error) {
      setApiError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.name?.trim()) {
      errors.name = "Name is required";
    }

    if (!values.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    return errors;
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting, setValues } = useForm({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
    validate: validateForm,
    onSubmit: async (formValues) => {
      setApiError(null);
      setSuccessMessage(null);

      // Check if any field changed
      const changes = {};
      if (formValues.name !== userData.name) changes.name = formValues.name;
      if (formValues.email !== userData.email) changes.email = formValues.email;
      if (formValues.phone !== userData.phone) changes.phone = formValues.phone;

      if (Object.keys(changes).length === 0) {
        setApiError("No changes to save");
        return;
      }

      try {
        const response = await authApi.updateProfile(changes);
        if (response.success) {
          setSuccessMessage("Profile updated successfully!");
          setUserData({ ...userData, ...changes });
          updateUser({ ...user, ...changes });
          setIsEditing(false);
        }
      } catch (error) {
        setApiError(error.message || "Failed to update profile");
      }
    },
  });

  useEffect(() => {
    if (userData) {
      setValues({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }
  }, [userData, setValues]);

  if (loading) {
    return <div className="text-center py-12 text-slate-600">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl flex-shrink-0">
            {userData?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-slate-900">{userData?.name}</h2>
              {userData?.email_verified && (
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-slate-600 mb-1">Student ID: {userData?.id}</p>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              Joined{" "}
              {new Date(userData?.created_at).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              icon={<PencilIcon className="w-4 h-4" />}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>

        {apiError && (
          <Alert variant="error" className="mb-4">
            {apiError}
          </Alert>
        )}

        {successMessage && (
          <Alert variant="success" className="mb-4">
            {successMessage}
          </Alert>
        )}

        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <p className="mt-1 text-slate-900">{userData?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <p className="mt-1 text-slate-900">{userData?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Phone Number</label>
              <p className="mt-1 text-slate-900">{userData?.phone || "-"}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              name="name"
              type="text"
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
              icon={PhoneIcon}
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
              disabled={isSubmitting}
            />

            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
                Save Changes
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsEditing(false);
                  setApiError(null);
                  setSuccessMessage(null);
                  setValues({
                    name: userData?.name || "",
                    email: userData?.email || "",
                    phone: userData?.phone || "",
                  });
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Security Tab Component
function SecurityTab() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const validateForm = (values) => {
    const errors = {};

    if (!values.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!values.newPassword) {
      errors.newPassword = "New password is required";
    } else if (values.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting, setValues } = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: validateForm,
    onSubmit: async (formValues) => {
      setApiError(null);
      setSuccessMessage(null);

      try {
        const response = await authApi.changePassword(
          formValues.currentPassword,
          formValues.newPassword
        );

        if (response.success) {
          setSuccessMessage("Password changed successfully! Redirecting to login...");
          
          // Clear session and redirect
          setTimeout(() => {
            logout();
            navigate("/login", { state: { message: "Password changed successfully. Please log in again." } });
          }, 2000);
        }
      } catch (error) {
        setApiError(error.message || "Failed to change password");
      }
    },
  });

  return (
    <div className="space-y-6">
      {/* Change Password Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Change Password</h3>
        <p className="text-sm text-slate-600 mb-6">Update your password to stay secure.</p>

        {apiError && (
          <Alert variant="error" className="mb-4">
            {apiError}
          </Alert>
        )}

        {successMessage && (
          <Alert variant="success" className="mb-4">
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput
            label="Current Password"
            name="currentPassword"
            placeholder="Enter current password"
            value={values.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
            disabled={isSubmitting}
          />

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
            placeholder="Repeat new password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            disabled={isSubmitting}
          />

          <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
            Change Password
          </Button>
        </form>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-slate-600 mb-4">Add an extra layer of security.</p>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ShieldIcon className="w-5 h-5 text-slate-400 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700 mb-1">
                Two-Factor Authentication is disabled
              </p>
              <p className="text-xs text-slate-500 mb-3">
                Enable 2FA to protect your account with an additional security layer.
              </p>
              <Button variant="secondary" size="sm" disabled>
                Enable 2FA (Coming Soon)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Coming Soon Tab Component
function ComingSoonTab({ title }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <BellIcon className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">{title} Coming Soon</h3>
        <p className="text-slate-600">
          We're working on this feature. It will be available in a future update.
        </p>
      </div>
    </div>
  );
}
