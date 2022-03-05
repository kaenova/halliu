import express from "express";
import { registerUserRoutes } from "./userRoutes.js";
import { registerBantuanRoutes } from "./bantuanRoutes.js";
import { registerHighlightRoutes } from "./highlightRoutes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorHeader from "../validator/errorHeader.js";

export default function init(ex) {
  var app = express();

  app.use(cookieParser());
  app.use(express.static("public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(errorHeader)

  registerUserRoutes(app);
  registerBantuanRoutes(app);
  registerHighlightRoutes(app);
  return app;
}
