import { Highlight, User } from "../models";
import fs from "fs";
import { Response } from "../utils/response";

class HighlightController {
  constructor() { }

  async create(req, res) {
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

      const user = await User.findByPk(req.user.id);
      if (user == null) {
        // Cleanup
        // NOTE: There will be a bug if there's a file other than image or video
        if (image != undefined) {
          fs.unlinkSync(image["path"]);
        }
        if (video != undefined) {
          fs.unlinkSync(video["path"]);
        }
        let response = new Response(404, null, "User not found");
        return res.status(response.status).json(response.getData());
      }

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
}

export default HighlightController;
