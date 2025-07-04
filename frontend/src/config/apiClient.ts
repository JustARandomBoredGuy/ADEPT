import axios from "axios";
import { refreshAuthToken } from "../lib/api";


const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
}

export const API = axios.create(options);


export const TokenRefreshClient = axios.create(options)
TokenRefreshClient.interceptors.response.use(
  async (response) => response.data,
)

API.interceptors.response.use(
  async (response) => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};
    console.log(status, data?.errorCode, config, error)

    if (status === 401 && data?.errorCode === "InvalidAccessToken") {
        console.log("frontend caught invalid token")
        await refreshAuthToken()
        return API(config)
    }

    return Promise.reject({ status, ...data })
  }
);

