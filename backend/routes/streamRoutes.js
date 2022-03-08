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
    controller.create
  )

  ex.get(
    "/stream",
    validator.validatePageQueryNumber,
    controller.getAll
  )

  
  ex.get(
    "/stream/:id",
    validator.validateIdParams,
    controller.getById
    )

    ex.get(
      "/self/stream",
      jwtMiddlewareReg,
      validator.validatePageQueryNumber,
      controller.getOwned
    )

  ex.get(
    "/self/stream/:id",
    jwtMiddlewareReg,
    validator.validateIdParams,
    controller.getOwnedById
  )

  ex.post(
    "/stream/publish",
    validator.validatePublishDestroy,
    controller.publish
  )

  ex.post(
    "/stream/destroy",
    validator.validatePublishDestroy,
    controller.destroy
  )
}

export { registerStreamRoutes };
