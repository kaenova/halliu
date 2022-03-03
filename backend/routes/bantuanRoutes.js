import {jwtMiddleware, jwtMiddlewareCS, jwtMiddlewareReg} from "../utils/jwtMiddleware.js";
import SupportController from "../controller/supportController.js";

function registerBantuanRoutes(ex) {
  ex.get("/support", SupportController.index);
  ex.post("/support", jwtMiddlewareReg, SupportController.create);
  ex.post("/support/:supportId", jwtMiddlewareCS, SupportController.reply)
  ex.get("/support/:supportId", jwtMiddleware, SupportController.getByID);
}

export { registerBantuanRoutes };