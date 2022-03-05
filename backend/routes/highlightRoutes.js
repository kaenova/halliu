import { jwtMiddlewareReg } from "../utils/middleware/jwtMiddleware";
import HighlightController from "../controller/highlightController";
import formData from "express-form-data"
import multer from "multer";

function registerHighlightRoutes(ex) {
  // Forms Upload Data
  const upload = multer({ dest: "public" });
  const highlightPostUpload = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ])

  // Preparing Controller and Validator
  let controller = new HighlightController()

  ex.post("/highlight", jwtMiddlewareReg,
  highlightPostUpload,
  controller.create);
}

export { registerHighlightRoutes }