import UserController from "../controller/userController.js";
import { jwtMiddleware } from "../utils/jwtMiddleware.js";
import formData from "express-form-data";
import UserValidatorRequest from "../validator/userValidatorRequest.js";

function registerUserRoutes(ex) {
  // Preparing Controller and Validator
  let validator = new UserValidatorRequest();
  let controller = new UserController();

  ex.get(
    "/api/user/:id",
    validator.validatePageQueryNumber,
    controller.getUserById
  );
  ex.get("/api/self", jwtMiddleware, controller.self);
  ex.get("/api/renew", jwtMiddleware, controller.renewToken);

  ex.post(
    "/api/register",
    formData.parse(),
    validator.validateUserRegister,
    controller.register
  );
  ex.post(
    "/api/login",
    formData.parse(),
    validator.validateUserLogin,
    controller.login
  );
}

export { registerUserRoutes };
