import { getToken } from "services";

export const getWorkspacesByOwnerIdAPI = (id = null) => {
  return {
    url: "admin/workspaces?owner_id=" + id,
    method: "get",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: {},
  };
};

export const createWorkspaceAPI = (params = {}) => {
  return {
    url: "admin/workspaces",
    method: "post",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: params,
  };
};

export const getWorkspaceAPI = (id = null) => {
  return {
    url: "admin/workspaces/" + id,
    method: "get",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: null,
  };
};

export const updateWorkspaceAPI = (id = null, params={}) => {
  return {
    url: "admin/workspaces/" + id,
    method: "put",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: params,
  };
};

export const setDefaultWorkspaceAPI = (id = null, params={}) => {
  return {
    url: "admin/workspaces/partiallyUpdate/1" + id,
    method: "put",
    headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
    body: params,
  };
};
