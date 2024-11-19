import {jwtDecode} from "jwt-decode";

// Define the structure of the token payload
interface TokenPayload {
  exp?: number; // Expiry time as a UNIX timestamp
}

/**
 * Extracts the expiry time from a JWT token.
 * @param token - The JWT token.
 * @returns The number of seconds until the token expires, or null if invalid.
 */
export const getTokenExpiry = (token: string): number | null => {
  try {
    const decoded: TokenPayload = jwtDecode(token);

    if (!decoded.exp) {
      return null; // No expiry time in token
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp - currentTime; // Remaining time in seconds
  } catch (error) {
    console.error("Failed to decode token:", (error as Error).message);
    return null; // Invalid token
  }
};
