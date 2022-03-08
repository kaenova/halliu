import { jwtMiddlewareReg } from "../utils/jwtMiddleware";
import multer from "multer";
import StreamController from "../controller/streamController";
import StreamValidatorReqeust from "../validator/streamValidatorRequest";

function registerStreamRoutes(ex) {
  // Forms Upload Data
  const upload = multer({ dest: "public" });
  const streamPostUpload = upload.fields([
    { name: "cover", maxCount: 1 },
  ]);

  // Preparing Controller and Validator
  let controller = new StreamController();
  let validator = new StreamValidatorReqeust();

  ex.post(
    "/stream",
    jwtMiddlewareReg,
    streamPostUpload,
    validator.validateCraete,
    controller.test
  )
}

export { registerStreamRoutes };
