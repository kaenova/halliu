import express from 'express';
import { registerUserRoutes } from './userRoutes.mjs';
import cookieParser from 'cookie-parser';

export default function init(ex) {
  var app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static('public'))

  registerUserRoutes(app);
  return app;
}