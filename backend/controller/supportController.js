import { SupportMessage, Sequelize, User } from "../models";
import { Op } from "sequelize";
import { Response } from "../utils/response";
import fs from "fs";
import ApiError from "../utils/apiError";

class SupportController {
  constructor() { }

  // Get all support messages except user id
  // Also support pagination
  index(req, res, next) {
    try {
      var pageNum = req.query["page"];
      var user = User.findByPk(req.user.id);

      if (user == null) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
      }

      var supportMessages = SupportMessage.findAll({
        where: {
          userId: {
            [Op.ne]: user.id,
          },
        },
        limit: 10,
        offset: (pageNum - 1) * 10,
        order: [["updatedAt", "DESC"]],
      });

      let response = new Response(200, supportMessages, "Sukses");
      return res.status(response.status).json(response.getData());
    } catch (e) {
      next(e)
    }
  }

  // Get support message by request user id
  // Also support pagination
  getByUserID(req, res, next) {
    try {
      var pageNum = req.query["page"];
      var user = User.findByPk(req.user.id);
      if (user == null) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
      }
      var supportMessages = SupportMessage.findAll({
        where: {
          userId: {
            [Op.eq]: user.id,
          },
        },
        limit: 10,
        offset: (pageNum - 1) * 10,
        order: [["updatedAt", "DESC"]],
      });
      let response = new Response(200, supportMessages, "Sukses");
      return res.status(response.status).json(response.getData());
    } catch (e) {
      next(e)
    }
  }

  // Creating support message
  create(req, res, next) {
    try {

      var image, video;
      var vidFile = null;
      var imgFile = null;

      var user = User.findByPk(req.user.id);
      if (user == null) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
      }

      // If there's an image file
      if (req.files["image"] != undefined) {
        let beforePath = image["path"];
        let afterPath = image["path"] + ".jpg";
        fs.renameSync(beforePath, afterPath);
        image["path"] = afterPath;
        imgFile = "/" + image["filename"] + ".jpg";
      }

      // If there's a video file
      if (req.files["video"] != undefined) {
        let beforePath = video["path"];
        let afterPath = video["path"] + ".mp4";
        fs.renameSync(beforePath, afterPath);
        video["path"] = afterPath;
        vidFile = "/" + video["filename"] + ".mp4";
      }

      let support = SupportMessage.build({
        message: req.body["message"],
        userId: user.id,
        reply: null,
        csId: null,
        image: imgFile,
        video: vidFile,
      }).save();

      let response = new Response(200, support["dataValues"], "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (e) {
      next(e)
    }
  }

  // Adding replies on support message
  reply(req, res, next) {
    try {
      let userID = req.user.id;
      let supportID = parseInt(req.params.supportId);

      var customerService = User.findByPk(userID);
      var supportMessage = SupportMessage.findByPk(supportID);

      if (customerService == null || supportMessage == null) {
        return next(ApiError.badRequest("Data tidak ditemukan"));
      }

      supportMessage.update({
        reply: req.body["reply"],
        csId: customerService.id,
      });

      let response = new Response(200, supportMessage["dataValues"], "Sukses");
      return res.status(response.status).json(response);
    } catch (e) {
      next(e)
    }
  }
}

export default SupportController;
