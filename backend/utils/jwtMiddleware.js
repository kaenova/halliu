/**
 * JWT Middleware Modules
 * @module JWTMiddleware
 */

import jwt from "jsonwebtoken";
import ApiError from "./apiError";
import { RequestHandler, Response } from "express";

/**
 * Middleware yang digunakan untuk memeriksa adanya JWT dan menentukan
 * memeriksa JWT valid untuk seluruh roles.
 * @param {RequestHandler} req
 * @param {Response} res
 * @param {*} next
 */
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

/**
 * Middleware yang digunakan untuk memeriksa adanya JWT dan menentukan
 * memeriksa JWT valid untuk roles Customer Service.
 * @param {RequestHandler} req
 * @param {Response} res
 * @param {*} next
 */
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

/**
 * Middleware yang digunakan untuk memeriksa adanya JWT dan menentukan
 * memeriksa JWT valid untuk roles Regular.
 * @param {RequestHandler} req
 * @param {Response} res
 * @param {*} next
 */
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
