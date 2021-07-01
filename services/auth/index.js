import Axios from "axios";
// import axios from "axios";
import { useAxios } from "hooks";
import { getToken, setToken } from "services";
import Cookies from "js-cookie";
const baseAPIUrl = process.env.NEXT_PUBLIC_API_URL;

const init = {
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  redirect: "follow",
  referrer: "no-referrer",
  withCredentials: true,

  // rejectUnauthorized: false,
  // requestCert: false,
  // credentials: "same-origin",
  // agent: false,
};
const axios = Axios.create({
  baseURL: baseAPIUrl,
  init,
});

export const loginProcess = async (params) => {
  try {
    const { data, status } = await axios
      .post("auth/login", params)
      .then((res) => res)
      .catch((err) => err.response);

    if (status == 200 && data) {
      let token = data?.data?.token || null;
      Cookies.set("user", JSON.stringify(data?.data), { expires: 7 });
      setToken(token);
    } else if (status === 400 || status == 401) {
      console.error("ERROR!", data?.message);
    }
    return { data, status };
  } catch (error) {
    console.error("ERROR CATCH!", error);
  }
};

export const sendEmailCodeAPI = (params) => {
  return {
    url: "/auth/forgot-password",
    method: "post",
    // headers: JSON.stringify({ accept: '*/*' }),
    body: params,
  };
};
export const sendMobileCodeAPI = (params) => {
  return {
    url: "/auth/send-code",
    method: "post",
    headers: JSON.stringify({ accept: "*/*" }),
    body: JSON.stringify(params),
  };
};

export const verifyOTPAPI = (params) => {
  return {
    url: "auth/verify-otp",
    method: "post",
    headers: JSON.stringify({ accept: "*/*" }),
    body: params,
  };
};

export const resetPasswordAPI = (params) => {
  return {
    url: "auth/reset-password",
    method: "post",
    headers: JSON.stringify({ accept: "*/*" }),
    // headers: { accept: '*/*', Authorization: "Bearer " + getToken() },
    body: JSON.stringify(params),
  };
};

export const changePasswordAPI = (params, id) => {
  return {
    url: "auth/user/__id__/change-password".replace("__id__", id),
    method: "put",
    // headers: JSON.stringify({ accept: '*/*' }),
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: JSON.stringify(params),
  };
};

export const changeUserProfileAPI = (params = {}, id = null) => {
  return {
    url: "auth/user/profile/update/" + id,
    method: "put",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: params,
  };
};
