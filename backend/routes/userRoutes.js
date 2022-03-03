import UserController from "../controller/userController.js";
import jwtMiddleware from "../utils/jwtMiddleware.js";

async function registerUserRoutes(ex) {
  ex.post("/register", UserController.register);
  ex.post("/login", UserController.login);
  ex.get("/self", jwtMiddleware, UserController.self);
}

export { registerUserRoutes };
