// --- Constants ---
const TOKEN_KEY = "rc_token";

// --- Save token securely ---
export const saveToken = (token, expiresIn = null) => {
  try {
    if (!token) throw new Error("No token provided");
    const payload = { token, expiresAt: expiresIn ? Date.now() + expiresIn * 1000 : null };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error("❌ Error saving token:", err);
  }
};

// --- Get saved token ---
export const getToken = () => {
  try {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return null;
    const { token, expiresAt } = JSON.parse(stored);

    // Check if expired
    if (expiresAt && Date.now() > expiresAt) {
      clearToken();
      console.warn("⚠️ Token expired");
      return null;
    }

    return token;
  } catch (err) {
    console.error("❌ Error getting token:", err);
    return null;
  }
};

// --- Remove token (logout) ---
export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.error("❌ Error clearing token:", err);
  }
};

// --- Check if user is authenticated ---
export const isAuthenticated = () => !!getToken();

// --- (Optional) Decode JWT payload ---
export const decodeToken = () => {
  try {
    const token = getToken();
    if (!token) return null;
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch (err) {
    console.error("❌ Error decoding token:", err);
    return null;
  }
};
