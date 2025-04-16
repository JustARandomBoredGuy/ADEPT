import { API } from "../config/apiClient";


export const sendPDF = async (files: FormData) => API.post("/api/parsePDF", files)

export const sendLink = async () => API.post("/api/parseLink")

export const removeToken = async () => API.post("/api/deleteToken")

export const getSession = async () => API.get("/api/getToken")

export const sendImg = async (file: FormData) => API.post("/api/parseImg", file)

type LoginParams = {
    email:string,
    password:string
}
export const login = async (data:LoginParams) => API.post("/auth/login", data)

type RegisterParams = {
    email:string,
    password:string,
    confirmPassword:string
}
export const register = async (data: RegisterParams) => API.post("/auth/register", data)
