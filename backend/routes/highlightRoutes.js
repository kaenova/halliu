import { jwtMiddlewareReg } from "../utils/jwtMiddleware";
import HighlightController from "../controller/highlightController";
import formData from "express-form-data"
import multer from "multer";

// Forms Upload Data
const upload = multer({ dest: "public" });
const highlightPostUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
])

function registerHighlightRoutes(ex) {
  ex.post("/highlight", jwtMiddlewareReg, highlightPostUpload, HighlightController.create);
}

export { registerHighlightRoutes }