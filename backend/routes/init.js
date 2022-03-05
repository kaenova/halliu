import express from "express";
import { registerUserRoutes } from "./userRoutes.js";
import { registerBantuanRoutes } from "./bantuanRoutes.js";
import { registerHighlightRoutes } from "./highlightRoutes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import os from "os";

export default function init(ex) {
  var app = express();

  app.use(cookieParser());
  app.use(express.static("public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());

  registerUserRoutes(app);
  registerBantuanRoutes(app);
  registerHighlightRoutes(app);
  return app;
}
