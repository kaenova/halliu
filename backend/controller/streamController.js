import { Stream, Sequelize, User } from "../models";
import { Op } from "sequelize";
import { Response } from "../utils/response";
import fs from "fs";
import ApiError from "../utils/apiError";

class StreamController {
  constructor() { }

  async test(req, res, next) {
    try {

      let user = await User.findOne({
        where: { id: req.user.id },
        attributes: ["id"],
      });
      
      if (user == null) {
        next(ApiError.badRequest("User tidak ditemukan"));
        return
      }

      // image processing
      var image = req.files["cover"][0];
      let beforePath = image["path"];
      let afterPath = image["path"] + ".jpg";
      fs.renameSync(beforePath, afterPath);
      image["path"] = afterPath;
      let imgFile = "/" + image["filename"] + ".jpg";

      let stream = await Stream.build({
        title: req.body["title"].trim(),
        cover: imgFile,
        streamKey: Stream.generateStreamKey(),
        userId: user.id,
        isPublished: false,
      }).save();

      let response = new Response(200, stream, "Sukses");
      return res.status(response.status).json(response.getData());

    } catch (e) {
      next(e)
    }
  }

  // // Get all support messages except user id
  // // Also support pagination
  // async index(req, res, next) {
  //   try {
  //     var pageNum = req.query["page"];
  //     var user = await User.findByPk(req.user.id);

  //     if (user == null) {
  //       return next(ApiError.unauthorized("User tidak ditemukan"));
  //     }

  //     var supportMessages = await SupportMessage.findAll({
  //       where: {
  //         userId: {
  //           [Op.ne]: user.id,
  //         },
  //       },
  //       limit: 10,
  //       offset: (pageNum - 1) * 10,
  //       order: [["updatedAt", "DESC"]],
  //     });

  //     let response = new Response(200, supportMessages, "Sukses");
  //     return res.status(response.status).json(response.getData());
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  // // Get support message by request user id
  // // Also support pagination
  // async getByUserID(req, res, next) {
  //   try {
  //     var pageNum = req.query["page"];
  //     var user = await User.findByPk(req.user.id);
  //     if (user == null) {
  //       return next(ApiError.unauthorized("User tidak ditemukan"));
  //     }
  //     var supportMessages = await SupportMessage.findAll({
  //       where: {
  //         userId: {
  //           [Op.eq]: user.id,
  //         },
  //       },
  //       limit: 10,
  //       offset: (pageNum - 1) * 10,
  //       order: [["updatedAt", "DESC"]],
  //     });
  //     let response = new Response(200, supportMessages, "Sukses");
  //     return res.status(response.status).json(response.getData());
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  // // Creating support message
  // async create(req, res, next) {
  //   try {

  //     var image, video;
  //     var vidFile = null;
  //     var imgFile = null;

  //     var user = await User.findByPk(req.user.id);
  //     if (user == null) {
  //       return next(ApiError.unauthorized("User tidak ditemukan"));
  //     }

  //     // If there's an image file
  //     if (req.files["image"] != undefined) {
  //       let beforePath = image["path"];
  //       let afterPath = image["path"] + ".jpg";
  //       fs.renameSync(beforePath, afterPath);
  //       image["path"] = afterPath;
  //       imgFile = "/" + image["filename"] + ".jpg";
  //     }

  //     // If there's a video file
  //     if (req.files["video"] != undefined) {
  //       let beforePath = video["path"];
  //       let afterPath = video["path"] + ".mp4";
  //       fs.renameSync(beforePath, afterPath);
  //       video["path"] = afterPath;
  //       vidFile = "/" + video["filename"] + ".mp4";
  //     }

  //     let support = await SupportMessage.build({
  //       message: req.body["message"],
  //       userId: user.id,
  //       reply: null,
  //       csId: null,
  //       image: imgFile,
  //       video: vidFile,
  //     }).save();

  //     let response = new Response(200, support["dataValues"], "Sukses");
  //     res.status(response.status).json(response.getData());
  //     return;
  //   } catch (e) {
  //     next(e)
  //   }
  // }

  // // Adding replies on support message
  // async reply(req, res, next) {
  //   try {
  //     let userID = req.user.id;
  //     let supportID = parseInt(req.params.supportId);

  //     var customerService = await User.findByPk(userID);
  //     var supportMessage = await SupportMessage.findByPk(supportID);

  //     if (customerService == null || supportMessage == null) {
  //       return next(ApiError.badRequest("Data tidak ditemukan"));
  //     }

  //     await supportMessage.update({
  //       reply: req.body["reply"],
  //       csId: customerService.id,
  //     });

  //     let response = new Response(200, supportMessage["dataValues"], "Sukses");
  //     return res.status(response.status).json(response);
  //   } catch (e) {
  //     next(e)
  //   }
  // }
}

export default StreamController;
