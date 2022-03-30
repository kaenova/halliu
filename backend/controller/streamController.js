import { Stream, Sequelize, User } from "../models";
import { Op } from "sequelize";
import { Response } from "../utils/response";
import fs from "fs";
import ApiError from "../utils/apiError";

class StreamController {
  constructor() { }

  // Create stream
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

  // Public, Get All Active Stream, by pagination
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

  // Public, Get Stream by ID
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

  // Protected (Regular), get All created stream with pagination
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

  // Protected (Regular), Get Stream by ID
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

  // Publish function for authenticating and publishing from rtmp server request
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

  // Publish function for destroying a stream in database from rtmp server request
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
