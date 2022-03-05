import { SupportMessage, Sequelize, User } from "../models";
import { Op } from "sequelize";
import validator from "validator";
import { Response } from "../utils/response";
import fs from "fs";

class SupportController {
  constructor() {}

  // Get all support messages except user id
  // Also support pagination
  async index(req, res) {
    try {
      var pageNum = req.query["page"];
      var user = await User.findByPk(req.user.id);

      if (user == null) {
        let response = new Response(400, null, "User tidak ditemukan");
        return res.status(response.status).json(response.getData());
      }

      var supportMessages = await SupportMessage.findAll({
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
      let response = new Response(500, null, e.message);
      return res.status(response.status).json(response.getData());
    }
  }

  // Get support message by request user id
  // Also support pagination
  async getByUserID(req, res) {
    try {
      var pageNum = req.query["page"];
      var user = await User.findByPk(req.user.id);
      var supportMessages = await SupportMessage.findAll({
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
      let response = new Response(500, null, error.message);
      return res.status(response.status).json(response.getData());
    }
  }

  // Creating support message
  async create(req, res) {
    var image, video;
    try {
      // Preparing data
      var vidFile = null;
      var imgFile = null;
      
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

      let support = await SupportMessage.build({
        message: req.body["message"],
        userId: req.user.id,
        reply: null,
        csId: null,
        image: imgFile,
        video: vidFile,
      }).save();

      let response = new Response(200, support["dataValues"], "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (e) {
      // Cleanup
      // NOTE: There will be a bug if there's a file other than image or video
      if (image != undefined) {
        fs.unlinkSync(image["path"]);
      }
      if (video != undefined) {
        fs.unlinkSync(video["path"]);
      }
      let response = new Response(500, null, error.message);
      return res.status(response.status).json(response.getData());
    }
  }

  // Adding replies on support message
  async reply(req, res) {
    try {
      let userID = req.user.id;
      let supportID = parseInt(req.params.supportId);

      var customerService = await User.findByPk(userID);
      var supportMessage = await SupportMessage.findByPk(supportID);

      if (customerService == null || supportMessage == null) {
        let response = new Response(404, null, "Not Found");
        return res.status(response.status).json(response.getData());
      }

      await supportMessage.update({
        reply: req.body["reply"],
        csId: customerService.id,
      });

      let response = new Response(200, supportMessage["dataValues"], "Sukses");
      return res.status(response.status).json(response);
    } catch (e) {
      let response = new Response(500, null, error.message);
      return res.status(response.status).json(response.getData());
    }
  }
}

export default SupportController;
