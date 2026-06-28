import { authStorage } from "./auth-storage";
import { ERROR_MESSAGES } from "./constants";

export class ApiError extends Error {
  constructor(responseCode, message, data = null) {
    super(message);
    this.name = "ApiError";
    this.responseCode = responseCode;
    this.data = data;
  }
}

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

export async function apiClient(endpoint, { body, ...customConfig } = {}) {
  const token = authStorage.getAccessToken();
  const headers = {
    "Content-Type": "application/json",
  };

  if (token && customConfig.auth !== false) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_BASE_URL}${endpoint}`, config);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }

  // Handle 401 Unauthorized
  if (response.status === 401 && customConfig.auth !== false) {
    const refreshToken = authStorage.getRefreshToken();
    
    if (!refreshToken) {
      authStorage.clearAll();
      window.location.href = "/login";
      return Promise.reject(new Error(ERROR_MESSAGES.SESSION_EXPIRED));
    }

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const refreshResponse = await fetch(`${import.meta.env.VITE_AUTH_SERVICE_BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        const refreshData = await refreshResponse.json();
        
        if (refreshData.success && refreshData.data?.access_token) {
          authStorage.saveTokens(refreshData.data.access_token, refreshData.data.refresh_token);
          isRefreshing = false;
          onRefreshed(refreshData.data.access_token);
        } else {
          throw new Error("Refresh failed");
        }
      } catch (error) {
        isRefreshing = false;
        authStorage.clearAll();
        window.location.href = "/login";
        return Promise.reject(new Error(ERROR_MESSAGES.SESSION_EXPIRED));
      }
    }

    // Wait for refresh to complete and retry original request
    return new Promise((resolve) => {
      addRefreshSubscriber((newToken) => {
        config.headers.Authorization = `Bearer ${newToken}`;
        resolve(apiClient(endpoint, config));
      });
    });
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(ERROR_MESSAGES.SERVER_ERROR);
  }

  if (response.ok && data.success) {
    return data;
  } else {
    const errorMessage = data.responseMessage || ERROR_MESSAGES.SERVER_ERROR;
    throw new ApiError(data.responseCode, errorMessage, data.data);
  }
}
