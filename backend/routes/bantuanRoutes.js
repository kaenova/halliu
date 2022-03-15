import {
  jwtMiddleware,
  jwtMiddlewareCS,
  jwtMiddlewareReg,
} from "../utils/jwtMiddleware.js";
import SupportController from "../controller/supportController.js";
import multer from "multer";
import formData from "express-form-data";
import SupportValidatorRequest from "../validator/supportValidatorRequest.js";

function registerBantuanRoutes(ex) {
  // Forms Upload Data
  const upload = multer({ dest: "public" });
  const supportPostUpload = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]);

  // Preparing Controller and Validator
  let controller = new SupportController();
  let validator = new SupportValidatorRequest();

  ex.get(
    "/support",
    jwtMiddleware,
    validator.validatePageQueryNumber,
    controller.index
  );
  ex.get(
    "/support/self",
    jwtMiddleware,
    validator.validatePageQueryNumber,
    controller.getByUserID
  );

  ex.post(
    "/support",
    jwtMiddlewareReg,
    supportPostUpload,
    validator.validateSupportCreate,
    controller.create
  );
  ex.post(
    "/support/:supportId",
    jwtMiddlewareCS,
    formData.parse(),
    validator.validateSupportReply,
    controller.reply
  );
}

export { registerBantuanRoutes };
