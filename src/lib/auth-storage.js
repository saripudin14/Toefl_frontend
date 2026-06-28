import { STORAGE_KEYS } from "./constants";

class AuthStorage {
  setRememberSession(remember) {
    if (remember) {
      localStorage.setItem(STORAGE_KEYS.REMEMBER, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBER);
    }
  }

  getRememberSession() {
    return localStorage.getItem(STORAGE_KEYS.REMEMBER) === 'true';
  }

  getStorage() {
    return this.getRememberSession() ? localStorage : sessionStorage;
  }

  saveTokens(accessToken, refreshToken) {
    const storage = this.getStorage();
    if (accessToken) storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    if (refreshToken) storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  getAccessToken() {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) || sessionStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  saveUser(user) {
    const storage = this.getStorage();
    if (user) {
      storage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  }

  getUser() {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER) || sessionStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }

  clearAll() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.USER);
  }
}

export const authStorage = new AuthStorage();
