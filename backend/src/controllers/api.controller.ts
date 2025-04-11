import path from "path";
import { BAD_REQUEST, OK } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import fs from "fs";
import { RAW_DATA_PATH } from "../constants/env";
import { API } from "../config/apiClient";


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


export const linkHandler = catchErrors(async (req, res) => {
    async () => API.get("/")
})