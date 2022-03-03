import { SupportMessage, Sequelize } from "../models";
import validator from "validator";
import { Response } from "../utils/response";
import { detectFileMimeType } from "../utils/getMIMEType";
import fs from "fs";
import path from "path";

class SupportController {
  // Get all support messages
  static async index(req, res) {
    try {
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // Get support message by request user id
  static async getByUserID(req, res) {
    try {
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

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
      res.status(500).json({ error: e.message });
    }
  }

  static async reply(req, res) {
    try {
      let userID = req.user.id;
      let supportID = req.params.supportId;
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default SupportController;
