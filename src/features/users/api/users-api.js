import { apiClient } from "../../../lib/api-client";

/**
 * Fetch a paginated and filtered list of users
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 10)
 * @param {string} params.search - Search query
 * @param {string} params.status - User status (ACTIVE, INACTIVE, etc.)
 * @param {string} params.role - User role
 */
export async function getUsers(params = {}) {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append("page", params.page);
  if (params.limit) queryParams.append("limit", params.limit);
  if (params.search) queryParams.append("search", params.search);
  if (params.status && params.status !== "ALL") queryParams.append("status", params.status);
  if (params.role && params.role !== "ALL") queryParams.append("role", params.role);
  
  const queryString = queryParams.toString();
  const endpoint = `/users${queryString ? `?${queryString}` : ""}`;
  
  return apiClient(endpoint);
}

/**
 * Get user by ID
 * @param {string} id - User ID
 */
export async function getUserById(id) {
  return apiClient(`/users/${id}`);
}

/**
 * Create a new user
 * @param {Object} userData - User data (name, email, password, phone, status, roles)
 */
export async function createUser(userData) {
  return apiClient("/users", {
    body: userData,
  });
}

/**
 * Update user basic information
 * @param {string} id - User ID
 * @param {Object} userData - Updated data
 */
export async function updateUser(id, userData) {
  return apiClient(`/users/${id}`, {
    method: "PUT",
    body: userData,
  });
}

/**
 * Update user status
 * @param {string} id - User ID
 * @param {string} status - New status (ACTIVE or INACTIVE)
 */
export async function updateUserStatus(id, status) {
  return apiClient(`/users/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
}

/**
 * Update user roles
 * @param {string} id - User ID
 * @param {string[]} roles - Array of roles
 */
export async function updateUserRoles(id, roles) {
  return apiClient(`/users/${id}/role`, {
    method: "PATCH",
    body: { roles },
  });
}

/**
 * Delete user
 * @param {string} id - User ID
 */
export async function deleteUser(id) {
  return apiClient(`/users/${id}`, {
    method: "DELETE",
  });
}
