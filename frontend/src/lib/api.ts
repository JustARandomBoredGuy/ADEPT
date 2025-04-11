import { API } from "../config/apiClient";


export const sendPDF = async (files: FormData) => API.post("/api/parsePDF", files)