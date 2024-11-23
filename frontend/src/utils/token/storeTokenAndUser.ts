import Cookies from "js-cookie";
import { getTokenExpiry } from "./getTokenExpiry";

/**
 *  Function to store the token and user in the cookies
 * @param token  - The JWT token.
 * @param user  - The JWT user
 * @returns 
 */
export const storeTokenAndUser = (token: string, user: object): void => {
  console.log("storeTokenAndUser user",user)
    const expiresIn = getTokenExpiry(token);
    if (expiresIn === null) {
      return; // Token is invalid
    }
  // Store the token in the local storage
  // Store the token with an expiration time
  Cookies.set("token", token, { expires: expiresIn / 86400 }); // `expiresIn` is in seconds, convert to days
console.log("storeTokenAndUser user",user)
  // Store the user as a JSON string
  Cookies.set("user", JSON.stringify(user), { expires: expiresIn / 86400 });
};
