import { apiClient } from "../../../lib/api-client";

export const authApi = {
  login: async (email, password) => {
    return apiClient("/auth/login", {
      body: { email, password },
      auth: false,
    });
  },

  register: async (userData) => {
    return apiClient("/auth/register", {
      body: userData,
      auth: false,
    });
  },

  forgotPassword: async (email) => {
    return apiClient("/auth/forgot-password", {
      body: { email },
      auth: false,
    });
  },

  resetPassword: async (token, newPassword) => {
    return apiClient("/auth/reset-password", {
      body: { token, new_password: newPassword },
      auth: false,
    });
  },

  getMe: async () => {
    return apiClient("/auth/me");
  },

  updateProfile: async (profileData) => {
    return apiClient("/auth/profile", {
      method: "PUT",
      body: profileData,
    });
  },

  changePassword: async (currentPassword, newPassword) => {
    return apiClient("/auth/password", {
      method: "PUT",
      body: { current_password: currentPassword, new_password: newPassword },
    });
  },

  logout: async () => {
    return apiClient("/auth/logout", {
      method: "POST",
    });
  },
};
