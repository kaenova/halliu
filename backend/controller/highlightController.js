import { Highlight, User } from "../models";
import { Op } from "sequelize";
import fs from "fs";
import multer from "multer";
import { Response } from "../utils/response";
import validator from "validator";

class HighlightController {
  constructor() {}
  
  async create(req, res) {
    var image,
      video = undefined;
    try {
      // Body and files validator (mandatory)
      if (
        req.body["title"] == undefined ||
        req.files["image"] == undefined ||
        req.files["video"] == undefined
      ) {
        if (image != undefined) {
          fs.unlinkSync(image["path"]);
        }
        if (video != undefined) {
          fs.unlinkSync(video["path"]);
        }
        let response = new Response(400, null, "Title tidak valid");
        res.status(response.status).json(response.getData());
        return;
      }

      image = req.files["image"][0];
      video = req.files["video"][0];

      if (validator.isEmpty(req.body["title"].trim())) {
        if (image != undefined) {
          fs.unlinkSync(image["path"]);
        }
        if (video != undefined) {
          fs.unlinkSync(video["path"]);
        }
        let response = new Response(400, null, "Title tidak boleh kosong");
        res.status(response.status).json(response.getData());
        return;
      }

      // image processing
      console.log(image, video);
      if (image["mimetype"] != "image/jpeg" || image["size"] > 9000000) {
        if (image != undefined) {
          fs.unlinkSync(image["path"]);
        }
        if (video != undefined) {
          fs.unlinkSync(video["path"]);
        }
        let response = new Response(400, null, "Upload tidak valid");
        res.status(response.status).json(response.getData());
        return;
      }
      let beforePath = image["path"];
      let afterPath = image["path"] + ".jpg";
      fs.renameSync(beforePath, afterPath);
      image["path"] = afterPath;
      let imgFile = "/" + image["filename"] + ".jpg";

      // video processing
      if (video["mimetype"] != "video/mp4" || video["size"] > 100000000) {
        if (image != undefined) {
          fs.unlinkSync(image["path"]);
        }
        if (video != undefined) {
          fs.unlinkSync(video["path"]);
        }
        let response = new Response(400, null, "Upload tidak valid");
        res.status(response.status).json(response.getData());
        return;
      }
      beforePath = video["path"];
      afterPath = video["path"] + ".mp4";
      fs.renameSync(beforePath, afterPath);
      video["path"] = afterPath;
      let vidFile = "/" + video["filename"] + ".mp4";

      const user = await User.findByPk(req.user.id);
      const highlight = await Highlight.create({
        userId: user.id,
        title: req.body.title.trim(),
        cover: imgFile,
        video: vidFile,
      });
      let response = new Response(200, highlight, "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (error) {
      // Cleanup
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
}

export default HighlightController;
