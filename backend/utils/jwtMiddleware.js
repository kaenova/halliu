import jwt from "jsonwebtoken";
import ApiError from "./apiError";

function jwtMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(new ApiError(403, "Unauthorized"));
      req.user = user;
      next();
    });
  } catch (e) {
    res.sendStatus(403);
  }
}

function jwtMiddlewareCS(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const jwtString = token.split(".")[1];
    const jwtData = JSON.parse(atob(jwtString));
    if (jwtData["role"] !== "cs") return res.sendStatus(403);
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(new ApiError(403, "Unauthorized"));
      req.user = user;
      next();
    });
  } catch (e) {
    res.sendStatus(403);
  }
}

function jwtMiddlewareReg(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const jwtString = token.split(".")[1];
    const jwtData = JSON.parse(atob(jwtString));
    if (jwtData["role"] !== "reg") return res.sendStatus(403);
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(new ApiError(403, "Unauthorized"));
      req.user = user;
      next();
    });
  } catch (e) {
    res.sendStatus(403);
  }
}

export { jwtMiddleware, jwtMiddlewareCS, jwtMiddlewareReg };
