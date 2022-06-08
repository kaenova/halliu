/**
 * @module HighlightController
 */

import { Highlight, User } from "../models";
import fs from "fs";
import { Response } from "../utils/response";
import ApiError from "../utils/apiError";
import { predictTextIsSpam } from "../utils/aiEndpoint";

/**
 * highlight controller digunakan untuk mengatur kebutuhan user untuk membuat, mendapatkan semua data  
 * highlight serta untuk melihat highlight berdasarkan id tertentu
 */
class HighlightController {
  constructor() { }
  /**
   * Digunakan untuk memndapatkan semua highlight yang dapat diakses oleh semua user
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   * 
   */
  async getAll(req, res, next) {
    try {
      const highlights = await Highlight.findAll({
        order: [["updatedAt", "DESC"]],
        attributes: ["id", "title", "cover"],
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

    /**
   * Digunakan untuk mendapatkan data highlight berdasarkan id 
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   * 
   */
  async getByID(req, res, next) {
    try {
      const highlight = await Highlight.findOne({
        where: {
          id: req.params.id
        },
        include: {
          model: User,
          attributes: ["id", "name"],
        }
      });
      if (highlight == null){
        next(ApiError.notFound("Tidak ditemukan"))
      }
      let response = new Response(200, highlight, "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (e) {
      next(e)
    }
  }

    /**
   * Digunakan untuk membuat suatu highlight
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   * 
   */
  async create(req, res, next) {
    try {

      if (predictTextIsSpam(req.body["title"]) == true) {
        return next(ApiError.badRequest("Terdeteksi spam"));
      }

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
      if (!user instanceof User) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
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
    } catch (e) {
      next(e)
    }
  }
}

export default HighlightController;
