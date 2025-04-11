import { NOT_FOUND, OK } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";


export const pdfHandler = catchErrors(async (req, res) => {
    const file = req.files;
    appAssert(file, NOT_FOUND, "File not found in request")
    
    console.log(file)

    return res.status(OK).json({ message: "File received successfully "})
})
