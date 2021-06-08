import Cookies from "js-cookie";

export const userDetail = () => {
  if (Cookies.get("user")) {
    let user = JSON.parse(Cookies.get("user"));
    return user;
  } else {
    return null;
  }
};

export const getToken = () => {
  return userDetail()?.token || null;
};

export const getUserId = () => {
  return userDetail()?.id || null;
};
