/**
 * @module StreamController
 */

import { Stream, Sequelize, User } from "../models";
import { Op } from "sequelize";
import { Response } from "../utils/response";
import fs from "fs";
import ApiError from "../utils/apiError";
import { predictTextIsSpam } from "../utils/aiEndpoint";

/**
 * Controller yang digunakan untuk menghandle entitas stream
 */
class StreamController {
  constructor() { }

    /**
   * Controller yang digunakan untuk membuat entitas stream yang belum diaktifkan
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   * 
   */
  async create(req, res, next) {
    try {
      let user = await User.findOne({
        where: { id: req.user.id },
        attributes: ["id"],
      });

      if (!user instanceof User) {
        next(ApiError.badRequest("User tidak ditemukan"));
        return
      }
      if (predictTextIsSpam(req.body["title"]) == true) {
        return next(ApiError.badRequest("Terdeteksi spam"));
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
        streamKey: await Stream.generateStreamKey(),
        userId: user.id,
        isPublished: false,
      }).save();

      let response = new Response(200, stream, "Sukses");
      return res.status(response.status).json(response.getData());

    } catch (e) {
      next(e)
    }
  }

  /**
   * Controller untuk mendapatkan semua entitas stream yang aktif atau beratribut
   * isPublish yang di set dengan True
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
  async getAll(req, res, next) {
    try {

      let stream = await Stream.findAll({
        attributes: ["id", "title", "cover"],
        order: [["updatedAt", "DESC"]],
        where: {
          isPublished: true
        },
        include: {
          model: User,
          attributes: ["id", "name"],
        }
      });

      if (!stream instanceof Stream) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      let response = new Response(200, stream, "Sukses")
      return res.status(response.status).json(response.getData())
    } catch (e) {
      next(e)
    }
  }

  /**
   * Mendapatkan detail stream yang sedang aktif dengan id yang sudah dispesifikasikan
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
  async getById(req, res, next) {
    try {
      let stream = await Stream.findOne({
        where: {
          id: req.params["id"],
          isPublished: true
        },
        attributes: ["id", "title", "cover"],
        include: {
          model: User,
          attributes: ["id", "name"],
        }
      });

      if (!stream instanceof Stream) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      let response = new Response(200, stream, "Sukses")
      return res.status(response.status).json(response.getData())
    } catch (e) {
      next(e)
    }
  }

  /**
   * Mendapatkan semua stream yang dimiliki oleh user tertentu
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
  async getOwned(req, res, next) {
    try {
      let user = await User.findByPk(req.user.id)
      if (!user instanceof User) {
        return next(ApiError.badRequest("User not valid"))
      }
      let stream =  await Stream.findAll({
        where: {
          userId: user.id
        },
        order: [["updatedAt", "DESC"]],
      });

      if (!stream instanceof Stream) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      let response = new Response(200, stream, "Sukses")
      return res.status(response.status).json(response.getData())
    } catch (e) {
      next(e)
    }
  }

  /**
   * Mendapatkan detail stream yang dimiliki oleh user tertentu
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
  async getOwnedById(req, res, next) {
    try {
      let user = await User.findByPk(req.user.id)
      if (!user instanceof User) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      let stream = await Stream.findOne({
        where: {
          id: req.params["id"],
          userId: user.id
        },
      });

      if (!stream instanceof Stream) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      let response = new Response(200, stream, "Sukses")
      return res.status(response.status).json(response.getData())
    } catch (e) {
      next(e)
    }
  }

  /**
   * Merubah atribut dari suatu stream isPublished menjadi true yang berasal dari
   * RTMP server request
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
  async publish(req, res, next) {
    try {
      let streamId = req.body.name
      let streamKey = req.body.key

      let stream = await Stream.findByPk(streamId, {
        where: {
          streamKey: streamKey
        }
      })
      if (!stream instanceof Stream) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      await Stream.update(
        { isPublished: true },
        {
          where: {
            id: streamId,
            streamKey: streamKey
          }
        }
      )

      let response = new Response(200, undefined, "Sukses")
      return res.status(response.status).json(response.getData())
    } catch (e) {
      next(e)
    }
  }

  /**
   * Menghapus stream ketika stream sudah selesai yang berasal dari RTMP server.
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
  async destroy(req, res, next) {
    try {
      let streamId = req.body.name
      let streamKey = req.body.key

      let stream = await Stream.findByPk(streamId, {
        where: {
          streamKey: streamKey
        }
      })
      if (!stream instanceof Stream) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      await stream.destroy()

      let response = new Response(200, undefined, "Sukses")
      return res.status(response.status).json(response.getData())
    } catch (e) {
      next(e)
    }
  }
}

export default StreamController;
