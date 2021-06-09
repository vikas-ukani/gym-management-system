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
