import path from "path";
import { BAD_REQUEST, OK } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import fs from "fs";
import { FLASK_URL, RAW_DATA_PATH } from "../constants/env";
import { API } from "../config/apiClient";
import axios from "axios"
import { ok } from "assert";


type fileSchema = Express.Multer.File[]
export const pdfHandler = catchErrors(async (req, res) => {
    const files = req.files as fileSchema
    appAssert(files, BAD_REQUEST, "No files sent")
    console.log(files)

    for (const file of files) {
        const filename = `${file.originalname}`;
        const filePath = path.join(RAW_DATA_PATH, filename);
    
        fs.writeFileSync(filePath, file.buffer);
      }

    return res.status(OK).json({ message: "File received successfully "})
})


export const connectionHandler = catchErrors(async (req, res) => {
    const response = async () => API.get("/")
    console.log(response);
    return res.status(OK).json({ message: "Connection successful "})
})  

export const linkHandler = catchErrors(async (req, res) => {
    const response = await API.get("/getNotes")
    // const response = await axios.get('http://localhost:5000/getNotes');
    console.log(response.data);
    return res.status(OK).json({ message: "Files Received", data: response.data})
})