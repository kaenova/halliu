import express from "express";
import { registerUserRoutes } from "./userRoutes.js";
import { registerBantuanRoutes } from "./bantuanRoutes.js";
import { registerHighlightRoutes } from "./highlightRoutes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import apiErrorHandler from "../utils/apiErrorHandler.js";
import { registerStreamRoutes } from "./streamRoutes.js";
import cors from 'cors'

export default function init(ex) {
  var app = express();
  app.use(cors())
  app.use(cookieParser());
  app.use("/static",express.static("public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());

  registerUserRoutes(app);
  registerBantuanRoutes(app);
  registerHighlightRoutes(app);
  registerStreamRoutes(app)
  app.options("*", cors())
  app.use(apiErrorHandler);
  return app;
}
