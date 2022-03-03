import {
  jwtMiddleware,
  jwtMiddlewareCS,
  jwtMiddlewareReg,
} from "../utils/jwtMiddleware.js";
import SupportController from "../controller/supportController.js";
import multer from "multer";
const upload = multer({ dest: "public" });
const supportPostUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

function registerBantuanRoutes(ex) {
  ex.get("/support", SupportController.index);
  ex.post(
    "/support",
    jwtMiddlewareReg,
    supportPostUpload,
    SupportController.create
  );
  ex.post("/support/:supportId", jwtMiddlewareCS, SupportController.reply);
  ex.get("/support/:supportId", jwtMiddleware, SupportController.getByUserID);
}

export { registerBantuanRoutes };
