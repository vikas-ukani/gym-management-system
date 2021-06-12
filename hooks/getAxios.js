import axios from "axios";
import { getToken } from "services";
import { baseAPIUrl, init } from "./useAxios";

export default async ({ url, method, headers = {} }) => {
  var response = [];
  var error = null;
  var statusCode = null;
  var loading = true;

  console.log("TOKEN::", getToken());
  console.log("GET::", baseAPIUrl + url, { ...headers });
  await axios
    .get(baseAPIUrl + url, { headers: { ...init, ...headers } })
    .then((res) => {
      response = res.data;
      statusCode = response.statusCode;
    })
    .catch((err) => {
      error = err.response?.data;
      console.error("ERR", error);
      statusCode = error.statusCode;
    })
    .finally(() => {
      loading = false;
    });

  return { response, error, loading, statusCode };
};
