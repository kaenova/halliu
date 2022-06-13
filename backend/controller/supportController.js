/**
 * @module SupportController
 */

import { SupportMessage, Sequelize, User } from "../models";
import { Op } from "sequelize";
import { Response } from "../utils/response";
import fs from "fs";
import ApiError from "../utils/apiError";
import { predictTextIsSpam } from "../utils/aiEndpoint";

/**
 * Support Controller digunakan untuk menghandle message/pesan bantuan yang diberikan user,
 * digunakan untuk mendapatkan dan membalas pesan bantuan dari user
 */
class SupportController {
  constructor() { }

  /**
   * Controller digunakan untuk mendapatkan semua pesan bantuan
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
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
          as: "reqUser",
          attributes: ["id", "name"],
        }
      });

      let response = new Response(200, supportMessages, "Sukses");
      return res.status(response.status).json(response.getData());
    } catch (e) {
      next(e)
    }
  }

  /**
   * Controller digunakan untuk mendapatkan semua pesan bantuan berdasarkan user id
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
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
          as: "reqUser",
          attributes: ["id", "name"],
        }
      });
      let response = new Response(200, supportMessages, "Sukses");
      return res.status(response.status).json(response.getData());
    } catch (e) {
      next(e)
    }
  }

   /**
   * Controller digunakan untuk membuat pesan bantuan
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
  async create(req, res, next) {
    try {

      var image, video;
      var vidFile = null;
      var imgFile = null;

      if (await predictTextIsSpam(req.body["message"]) == true) {
        return next(ApiError.badRequest("Terdeteksi spam"));
      }
      
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

  /**
   * Controller digunakan untuk menambahkan sebuah reply atau balasan di pesan bantuan
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
  async reply(req, res, next) {
    try {
      let userID = req.user.id;
      let supportID = parseInt(req.params.supportId);

      var customerService = await User.findByPk(userID);
      var supportMessage = await SupportMessage.findByPk(supportID);

      if (customerService == null || supportMessage == null) {
        return next(ApiError.badRequest("Data tidak ditemukan"));
      }
      
      await supportMessage.update({
        reply: req.body["reply"],
        csId: customerService.id,
      });

      let response = new Response(200, supportMessage["dataValues"], "Sukses");
      return res.status(response.status).json(response);
    } catch (e) {
      next(e)
    }
  }


  /**
   * Controller digunakan untuk mendapatkan pesan bantuan yang belum dibalas atau direply
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
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
          as: "reqUser",
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
