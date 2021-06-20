import axios from "axios";
import { getToken, getTokenType } from "services";

const EMPLOYEE_FILE_TYPE_MODULE = "employee";

const baseAPIUrl = process.env.NEXT_PUBLIC_API_URL;
export const mediaUploadAPI = {
  url: baseAPIUrl + "media/upload",
  method: "post",
  headers: {
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data;",
      // "Content-Type": "application/json"
    },
    mode: "cors",
    redirect: "follow",
    referrer: "no-referrer",
    withCredentials: true,
    "Content-Type": "multipart/form-data;",
    Authorization: "Bearer " + getToken(),
  },
  body: {},
};

export const mediaDeleteAPI = (params = {}) => {
  return {
    url: baseAPIUrl + "media/delete",
    method: "delete",
    headers: {
      accept: "*/*",
      "content-type": "multipart/form-data",
      Authorization: "Bearer " + getToken(),
    },
    body: params,
  };
};

export const getMediaImageAPI = (params = {}) => {
  return {
    url: "media/find-by-ids",
    method: "post",
    headers: { accept: "*/*", Authorization:  `${getTokenType()} ${getToken()}`},
    body: params,
  };
};

export const uploadImageService = async (options, params = {}) => {
  let progress = 0;
  const { onSuccess, onError, file, onProgress } = options;

  const config = {
    headers: { ...mediaDeleteAPI.headers },
    onUploadProgress: (event) => {
      const percent = Math.floor((event.loaded / event.total) * 100);
      progress = percent;
      if (percent === 100) {
        setTimeout(() => (progress = 0), 1000);
      }
      onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  };

  const fmData = new FormData();
  fmData.append("files[0]", file);
  fmData.append("type", params.types);

  let response,
    error = null;
  let statusCode = null;

  await axios
    .post(mediaUploadAPI.url, fmData, config)
    .then((res) => {
      response = res.data;
      statusCode = response.statusCode;
      onSuccess("Ok");
    })
    .catch((err) => {
      console.log("Error ", err);
      error = err.response?.data;
      onError({ event: err });
      statusCode = error?.statusCode;
    });
  onSuccess("Ok");
  // console.log("Track", response, error, statusCode);
  return { progress, response, error, statusCode };
};
