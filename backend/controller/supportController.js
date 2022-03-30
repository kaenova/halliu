import { SupportMessage, Sequelize, User } from "../models";
import { Op } from "sequelize";
import { Response } from "../utils/response";
import fs from "fs";
import ApiError from "../utils/apiError";

class SupportController {
  constructor() { }

  // Get all support messages except user id
  // Also support pagination
  async getAll(req, res, next) {
    try {
      var user = await User.findByPk(req.user.id);

      if (!user instanceof User) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
      }

      var supportMessages = await SupportMessage.findAll({
        where: {
          userId: {
            [Op.ne]: user.id,
          },
        },
        order: [["updatedAt", "DESC"]],
        include: {
          model: User,
          attributes: ["id", "name"],
        }
      });

      let response = new Response(200, supportMessages, "Sukses");
      return res.status(response.status).json(response.getData());
    } catch (e) {
      next(e)
    }
  }

  // Get support message by request user id
  // Also support pagination
  async getByUserID(req, res, next) {
    try {
      var user = await User.findByPk(req.user.id);
      if (!user instanceof User) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
      }
      var supportMessages = await SupportMessage.findAll({
        where: {
          userId: {
            [Op.eq]: user.id,
          },
        },
        order: [["updatedAt", "DESC"]],
        include: {
          model: User,
          attributes: ["id", "name"],
        }
      });
      let response = new Response(200, supportMessages, "Sukses");
      return res.status(response.status).json(response.getData());
    } catch (e) {
      next(e)
    }
  }

  // Creating support message
  async create(req, res, next) {
    try {

      var image, video;
      var vidFile = null;
      var imgFile = null;

      var user = await User.findByPk(req.user.id);
      if (!user instanceof User) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
      }

      // If there's an image file
      if (req.files["image"] != undefined) {
        image = req.files["image"][0]
        let beforePath = image["path"];
        let afterPath = image["path"] + ".jpg";
        fs.renameSync(beforePath, afterPath);
        image["path"] = afterPath;
        imgFile = "/" + image["filename"] + ".jpg";
      }

      // If there's a video file
      if (req.files["video"] != undefined) {
        video = req.files["video"][0]
        let beforePath = video["path"];
        let afterPath = video["path"] + ".mp4";
        fs.renameSync(beforePath, afterPath);
        video["path"] = afterPath;
        vidFile = "/" + video["filename"] + ".mp4";
      }

      let support = await SupportMessage.build({
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
  async reply(req, res, next) {
    try {
      let userID = req.user.id;
      let supportID = parseInt(req.params.supportId);

      var customerService = await User.findByPk(userID);
      var supportMessage = await SupportMessage.findByPk(supportID);

      if (!customerService instanceof User || !supportMessage instanceof SupportMessage) {
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

  async getAllNoReply(req, res, next) {
    try {
      var supportMessages = await SupportMessage.findAll({
        where: {
          reply: {
            [Op.eq]: null
          },
          csId: {
            [Op.eq]: null
          }
        },
        order: [["updatedAt", "DESC"]],
        include: {
          model: User,
          attributes: ["id", "name"],
        }
      });

      let response = new Response(200, supportMessages, "Sukses");
      return res.status(response.status).json(response.getData());
    } catch (e) {
      next(e)
    }
  }
}

export default SupportController;
