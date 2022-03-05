import UserController from "../controller/userController.js";
import { jwtMiddleware } from "../utils/middleware/jwtMiddleware.js";
import formData from "express-form-data";
import errValidatorHeader from "../validator/errValidatorHeader.js";
import UserValidatorRequest from "../validator/userValidatorRequest.js";

function registerUserRoutes(ex) {
  // Preparing Controller and Validator
  let validator = new UserValidatorRequest()
  let controller = new UserController()

  ex.get("/user/:id",
    validator.validatePageQueryNumber,
    controller.getUserById
  );
  ex.get("/self", jwtMiddleware, controller.self);
  ex.get("/renew", jwtMiddleware, controller.renewToken);

  ex.post("/register", formData.parse(),
    validator.validateUserRegister,
    errValidatorHeader,
    controller.register);
  ex.post("/login", formData.parse(),
    validator.validateUserLogin,
    errValidatorHeader,
    controller.login);
}

export { registerUserRoutes };
