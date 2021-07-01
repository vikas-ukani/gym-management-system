
import { getToken, getTokenType } from "services";

export const getAllLeaveSettingsListAPI = (params = {}) => {
    return {
        url: "admin/leave-settings/list",
        method: "post",
        headers: { accept: "*/*", Authorization: `${getTokenType()} ${getToken()}` },
        body: params,
    };
};
