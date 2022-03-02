import UserController from "../controller/userController.mjs";

async function registerUserRoutes(ex) {
  ex.post("/register", UserController.register);
  ex.post("/login", UserController.login);
}

export { registerUserRoutes }