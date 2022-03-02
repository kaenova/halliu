import UserController from "../controller/userController.mjs";
import jwtMiddleware from "../utils/jwtMiddleware.mjs"

async function registerUserRoutes(ex) {
  ex.post("/register", UserController.register);
  ex.post("/login", UserController.login);
  ex.get("/self", jwtMiddleware, UserController.self);
}

export { registerUserRoutes }