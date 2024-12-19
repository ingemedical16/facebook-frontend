import Cookies from "js-cookie";
import { getTokenExpiry } from "./getTokenExpiry";


// Utility: Check if the token is valid
export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  const expiresIn = getTokenExpiry(token);
  return expiresIn !== null && expiresIn > 0; // Token is valid if not expired
};

// Utility: Retrieve user from cookies if token is valid
export const getUserFromCookies = (): { token: string; user: any } | null => {
  const token = Cookies.get("token");
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;

  if (token && isTokenValid(token)) {
    return { token, user };
  }

  // Clear invalid data from cookies
  Cookies.remove("token");
  Cookies.remove("user");
  return null;
};
