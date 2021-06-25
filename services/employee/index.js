
import { getToken, getTokenType } from "services";


// export const listMasterAPI = (qString = "") => {
//     return {
//         url: "admin/masters?" + qString,
//         method: "get",
//         headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
//         body: null,
//     };
// };

export const createEmployeeAPI = (params = {}) => {
    return {
        url: "admin/employees",
        method: "post",
        headers: { accept: "*/*", Authorization: "Bearer " + getToken() },
        body: params,
    };
};
