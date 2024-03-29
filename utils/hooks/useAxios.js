
import { useState, useEffect } from 'react';
import Axios from 'axios';

const baseAPIUrl = process.env.NEXT_PUBLIC_API_URL;

const init = {
    cache: "no-cache",
    credentials: "same-origin",
    "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    mode: "cors",
    redirect: "follow",
    referrer: "no-referrer",
    withCredentials: true,


    // cache: "no-cache",
    // credentials: "same-origin",
    // "headers": {
    //     "Content-Type": "application/json"
    // }
    // mode: "cors",
    // redirect: "follow",
    // referrer: "no-referrer",
    // withCredentials: true,

};
const axios = Axios.create({
    baseURL: baseAPIUrl,
    init,
});

const useAxios = async ({ url, method, body = null, headers = {} }) => {
    let response, error = null
    let loading = true
    let statusCode = null

    let finalHeader = {}
    // await axios[method](url, body, { headers: { ...headers } })
    if (method == "get") {
        await axios[method](url, { headers: { ...init, ...headers } })
            .then((res) => {
                response = res.data;
                statusCode = response.statusCode
            })
            .catch((err) => {
                error = err.response.data;
                console.error('ERR', error);
                statusCode = error.statusCode
            })
            .finally(() => {
                loading = false;
            });
    } else {
        await axios[method](url, body, { headers: { ...init, ...headers } })
            // await axios[method](url, JSON.parse(body), JSON.parse(headers))
            .then((res) => {
                response = res.data;
                statusCode = response.statusCode
            })
            .catch((err) => {
                error = err.response.data;
                console.error('ERR', error);
                statusCode = error.statusCode
            })
            .finally(() => {
                loading = false;
            });
    }
    return { response, error, loading, statusCode };
};

export default useAxios;
