import {
  jwtMiddleware,
  jwtMiddlewareCS,
  jwtMiddlewareReg,
} from "../utils/jwtMiddleware.js";
import SupportController from "../controller/supportController.js";
import multer from "multer";
import formData from "express-form-data";

const upload = multer({ dest: "public" });
const supportPostUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

function registerBantuanRoutes(ex) {
  ex.get("/support", jwtMiddleware, SupportController.index);
  ex.get("/support/self", jwtMiddleware, SupportController.getByUserID);
  ex.post(
    "/support",
    jwtMiddlewareReg,
    supportPostUpload,
    SupportController.create
  );
  ex.post(
    "/support/:supportId",
    jwtMiddlewareCS,
    formData.parse(),
    SupportController.reply
  );
}

export { registerBantuanRoutes };
