
import { getToken, getTokenType } from "services";


export const listEmployeeListAPI = (workspace_id = 1) => {
    return {
        url: "admin/employees?workspace_id=" + workspace_id,
        method: "get",
        headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
        body: null,
    };
};

export const createEmployeeAPI = (params = {}) => {
    return {
        url: "admin/employees",
        method: "post",
        headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
        body: params,
    };
};
