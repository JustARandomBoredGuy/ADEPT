import { Router } from "express";
import { pdfHandler } from "../controllers/api.controller";
import multer from "multer";


const upload = multer()
const apiRoutes = Router();

// prefix: /api
apiRoutes.post("/parsePDF", upload.any(), pdfHandler);
// apiRoutes.post("/parseLink", linkHandler);

export default apiRoutes;
