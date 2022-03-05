import UserController from "../controller/userController.js";
import { jwtMiddleware } from "../utils/middleware/jwtMiddleware.js";
import formData from "express-form-data";
import errValidatorHeader from "../utils/middleware/validatorMiddlewareCheck.js";
import UserValidatorRequest from "../utils/middleware/validator/userValidatorRequest.js";

function registerUserRoutes(ex) {
  ex.get("/user/:id", UserController.getUserById);
  ex.get("/self", jwtMiddleware, UserController.self);
  ex.get("/renew", jwtMiddleware, UserController.renewToken);

  ex.post("/register", formData.parse(),
    UserValidatorRequest.validateUserRegister,
    errValidatorHeader,
    UserController.register);
  ex.post("/login", formData.parse(),
    UserValidatorRequest.validateUserLogin,
    errValidatorHeader,
    UserController.login);
}

export { registerUserRoutes };
