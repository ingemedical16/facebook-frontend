import Cookies from "js-cookie";
export const clearUserFromCookies = (): void => {
    Cookies.remove("token");
    Cookies.remove("user");
  };