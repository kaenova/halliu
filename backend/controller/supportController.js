import { SupportMessage, Sequelize, User } from "../models";
import { Op } from "sequelize";
import validator from "validator";
import { Response } from "../utils/response";
import fs from "fs";
import path from "path";

class SupportController {
  // Get all support messages except user id
  // Also support pagination
  static async index(req, res) {
    var pageNum = 1;
    try {
      // Try to convert page number to integer
      if (req.query["page"] != undefined) {
        pageNum = parseInt(req.query["page"]);
        if (isNaN(pageNum) || pageNum < 1) {
          pageNum = 1;
        }
      }
      var user = await User.findByPk(req.user.id);
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
  static async getByUserID(req, res) {
    var pageNum = 1;
    try {
      // Try to convert page number to integer
      if (req.query["page"] != undefined) {
        pageNum = parseInt(req.query["page"]);
        if (isNaN(pageNum) || pageNum < 1) {
          pageNum = 1;
        }
      }
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
  // Mandatory to have message
  // Optional to add images and videos
  static async create(req, res) {
    var image, video;
    try {
      // Body validator (mandatory)
      if (req.body["message"] == undefined) {
        let response = new Response(400, null, "Message tidak valid");
        res.status(response.status).json(response.getData());
        return;
      }
      if (validator.isEmpty(req.body["message"])) {
        let response = new Response(400, null, "Message tidak boleh kosong");
        res.status(response.status).json(response.getData());
        return;
      }

      // Body validator (optional)
      var vidFile = null;
      var imgFile = null;
      if (req.files["image"] != undefined) {
        image = req.files["image"][0];
        if (image["mimetype"] != "image/jpeg" || image["size"] > 3000000) {
          let response = new Response(400, null, "Upload tidak valid");
          res.status(response.status).json(response.getData());
          return;
        }
        let beforePath = image["path"];
        let afterPath = image["path"] + ".jpg";
        fs.renameSync(beforePath, afterPath);
        image["path"] = afterPath;
        imgFile = "/" + image["filename"] + ".jpg";
      }
      if (req.files["video"] != undefined) {
        video = req.files["video"][0];
        if (video["mimetype"] != "video/mp4" || video["size"] > 100000000) {
          let response = new Response(400, null, "Upload tidak valid");
          res.status(response.status).json(response.getData());
          return;
        }
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
      if (image != undefined) {
        fs.rm(image["path"]);
      }
      if (video != undefined) {
        fs.rm(video["path"]);
      }
      let response = new Response(500, null, error.message);
      return res.status(response.status).json(response.getData());
    }
  }

  // Adding replies on support message
  // Mandatory to have reply
  static async reply(req, res) {
    try {
      let userID = req.user.id;
      let supportID = parseInt(req.params.supportId);
      // Getting all models needed
      var customerService = await User.findByPk(userID);
      var supportMessage = await SupportMessage.findByPk(supportID);

      // Validator
      if (req.body["reply"] == undefined || req.body["reply"].trim() == "") {
        let response = new Response(400, null, "Reply tidak boleh kosong");
        res.status(response.status).json(response.getData());
        return;
      }

      if (supportMessage["csId"] != null || supportMessage["reply"] != null) {
        let response = new Response(400, null, "Reply sudah diisi");
        res.status(response.status).json(response.getData());
        return;
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
