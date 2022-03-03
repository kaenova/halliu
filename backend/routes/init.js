import express from "express";
import { registerUserRoutes } from "./userRoutes.js";
import { registerBantuanRoutes } from "./bantuanRoutes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import os from "os";
import formData from "express-form-data";

export default function init(ex) {
  var app = express();
  
  app.use(cookieParser());
  app.use(express.static("public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());

  // Form-Data Middleware
  const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
  };
  // parse data with connect-multiparty. 
  app.use(formData.parse(options));
  // delete from the request all empty files (size == 0)
  app.use(formData.format());
  // change the file objects to fs.ReadStream 
  app.use(formData.stream());
  // union the body and the files
  app.use(formData.union());

  registerUserRoutes(app);
  registerBantuanRoutes(app);
  return app;
}
