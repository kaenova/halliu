import { Highlight, User } from "../models";
import fs from "fs";
import { Response } from "../utils/response";
import ApiError from "../utils/apiError";

class HighlightController {
  constructor() { }

  // Get Highlight
  // With pagination
  getAll(req, res, next) {
    try {
      var pageNum = req.query["page"];
      const highlights = Highlight.findAll({
        order: [["updatedAt", "DESC"]],
        attributes: ["id", "title", "cover"],
        limit: 10,
        offset: (pageNum - 1) * 10,
        include: {
          model: User,
          attributes: ["id", "name"],
        }
      });
      let response = new Response(200, highlights, "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (e) {
      next(e)
    }
  }

  create(req, res, next) {
    try {
      var image = req.files["image"][0];
      var video = req.files["video"][0];

      // image processing
      let beforePath = image["path"];
      let afterPath = image["path"] + ".jpg";
      fs.renameSync(beforePath, afterPath);
      image["path"] = afterPath;
      let imgFile = "/" + image["filename"] + ".jpg";

      // video processing
      beforePath = video["path"];
      afterPath = video["path"] + ".mp4";
      fs.renameSync(beforePath, afterPath);
      video["path"] = afterPath;
      let vidFile = "/" + video["filename"] + ".mp4";

      const user = User.findByPk(req.user.id);
      if (user == null) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
      }

      const highlight = Highlight.create({
        userId: user.id,
        title: req.body.title.trim(),
        cover: imgFile,
        video: vidFile,
      });

      let response = new Response(200, highlight, "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (e) {
      next(e)
    }
  }
}

export default HighlightController;
