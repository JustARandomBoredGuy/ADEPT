import path from "path";
import { BAD_REQUEST, OK } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import fs from "fs";


const pdfDir = "./src/constants/rawData"
type fileSchema = Express.Multer.File[]
export const pdfHandler = catchErrors(async (req, res) => {
    const files = req.files as fileSchema
    appAssert(files, BAD_REQUEST, "No files sent")
    console.log(files)

    for (const file of files) {
        const filename = `${file.originalname}`;
        const filePath = path.join(pdfDir, filename);
    
        fs.writeFileSync(filePath, file.buffer);
      }

    return res.status(OK).json({ message: "File received successfully "})
})
