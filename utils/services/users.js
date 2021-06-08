import { getToken } from "services"

export const usersListAPI = (params = {}) => {
    return {
        url: "admin/users",
        method: "get",
        headers: { accept: '*/*', Authorization: "Bearer " + getToken() },
        body: JSON.stringify(params),
    }
}

export const usersCreateAPI = (params = {}) => {
    return {
        url: "admin/users",
        method: "post",
        headers: { accept: '*/*', Authorization: "Bearer " + getToken() },
        body: params,
    }
}

export const getUserByIdAPI = (id = null) => {
    return {
        url: "admin/users/" + id,
        method: "get",
        headers: { accept: '*/*', Authorization: "Bearer " + getToken() },
        body: {},
    }
}

export const updateUserByIdAPI = (params = {}, id = null) => {
    return {
        url: "admin/users/" + id,
        method: "put",
        headers: { accept: '*/*', Authorization: "Bearer " + getToken() },
        body: params,
    }
}
export const updateActiveDeactiveIdAPI = (params = {}, id = null) => {
    return {
        url: "admin/users/partiallyUpdate/" + id,
        method: "put",
        headers: { accept: '*/*', Authorization: "Bearer " + getToken() },
        body: params,
    }
}

export const deleteUserByIdAPI = (id = null) => {
    return {
        url: "admin/users/" + id,
        method: "delete",
        headers: { accept: '*/*', Authorization: "Bearer " + getToken() },
        body: params,
    }
}

export const usersRoleListAPI = (params = {}) => {
    return {
        url: "admin/users/role-list?is_default=1",
        method: "get",
        headers: { accept: '*/*', Authorization: "Bearer " + getToken() },
        body: JSON.stringify(params),
    }
}

// export const usersListAPI = (params = {}) => {
//     return {
//         url: "admin/users",
//         method: "get",
//         headers: { Accept: '*/*', Authorization: "Bearer " + getToken() },
//         body: params,
//     }
// }