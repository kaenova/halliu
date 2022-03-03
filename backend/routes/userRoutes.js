import UserController from "../controller/userController.js";
import { jwtMiddleware } from "../utils/jwtMiddleware.js";
import formData from "express-form-data";

function registerUserRoutes(ex) {
  ex.post("/register", formData.parse(), UserController.register);
  ex.post("/login", formData.parse(), UserController.login);
  ex.get("/self", jwtMiddleware, UserController.self);
  ex.get("/renew", jwtMiddleware, UserController.renewToken);
}

export { registerUserRoutes };
