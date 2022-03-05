import { jwtMiddlewareReg } from "../utils/jwtMiddleware";
import HighlightController from "../controller/highlightController";
import HighlightValidatorReqeust from "../validator/highlightValidatorRequest";
import multer from "multer";

function registerHighlightRoutes(ex) {
  // Forms Upload Data
  const upload = multer({ dest: "public" });
  const highlightPostUpload = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]);

  // Preparing Controller and Validator
  let controller = new HighlightController();
  let validator = new HighlightValidatorReqeust();

  ex.post(
    "/highlight",
    jwtMiddlewareReg,
    highlightPostUpload,
    validator.validateCraete,
    controller.create
  );
}

export { registerHighlightRoutes };
