import { getToken, getTokenType } from "services";

export const listMasterAPI = (qString = "") => {
  return {
    url: "admin/masters?" + qString,
    method: "get",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: null,
  };
};

export const createMastersAPI = (params = {}) => {
  return {
    url: "admin/masters",
    method: "post",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: params,
  };
};

export const getMastersByIdAPI = (id = null) => {
  return {
    url: "admin/masters/" + id,
    method: "get",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: {},
  };
};

export const updateMastersByIdAPI = (params = {}, id = null) => {
  return {
    url: "admin/masters/" + id,
    method: "put",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: params,
  };
};

export const updateActiveDeactiveIdAPI = (params = {}, id = null) => {
  return {
    url: "admin/masters/partiallyUpdate/" + id,
    method: "put",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: params,
  };
};

export const deleteMasterByIdAPI = (id = null) => {
  return {
    url: "admin/masters/" + id,
    method: "delete",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: null,
  };
};

export const subMasterByMasterId = (qString = "") => {
  return {
    // admin/masters/sub-masters/list?page=1&limit=10&parent_id=9
    url: "admin/masters/sub-masters/list?" + qString,
    method: "get",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: null,
  };
};

export const getMasterByCode = (code = "") => {
  return {
    // admin/masters/sub-masters/list?page=1&limit=10&parent_id=9
    url: "masters-by-code?code=" + code,
    // url: "masters-by-code?code[0]=" + code,
    method: "get",
    headers: { accept: "*/*", Authorization: `${getTokenType()}${getToken()}`},
    body: null,
  };
};
