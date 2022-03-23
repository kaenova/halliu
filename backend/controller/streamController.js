import { Stream, Sequelize, User } from "../models";
import { Op } from "sequelize";
import { Response } from "../utils/response";
import fs from "fs";
import ApiError from "../utils/apiError";

class StreamController {
  constructor() { }

  // Create stream
  create(req, res, next) {
    try {
      let user = User.findOne({
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

      let stream = Stream.build({
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

  // Public, Get All Active Stream, by pagination
  getAll(req, res, next) {
    try {
      var pageNum = req.query["page"];

      let stream = Stream.findAll({
        attributes: ["id", "title", "cover"],
        limit: 10,
        offset: (pageNum - 1) * 10,
        order: [["updatedAt", "DESC"]],
        where: {
          isPublished: true
        }
      });

      if (stream == null) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      let response = new Response(200, stream, "Sukses")
      return res.status(response.status).json(response.getData())
    } catch (e) {
      next(e)
    }
  }

  // Public, Get Stream by ID
  getById(req, res, next) {
    try {
      let stream = Stream.findOne({
        where: {
          id: req.params["id"],
          isPublished: true
        },
        attributes: ["id", "title", "cover"],
      });

      if (stream == null) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      let response = new Response(200, stream, "Sukses")
      return res.status(response.status).json(response.getData())
    } catch (e) {
      next(e)
    }
  }

  // Protected (Regular), get All created stream with pagination
  getOwned(req, res, next) {
    try {
      var pageNum = req.query["page"];
      let user = User.findByPk(req.user.id)
      if (user == null) {
        return next(ApiError.badRequest("User not valid"))
      }
      let stream = Stream.findAll({
        where: {
          userId: user.id
        },
        limit: 10,
        offset: (pageNum - 1) * 10,
        order: [["updatedAt", "DESC"]],
      });

      if (stream == null) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      let response = new Response(200, stream, "Sukses")
      return res.status(response.status).json(response.getData())
    } catch (e) {
      next(e)
    }
  }

  // Protected (Regular), Get Stream by ID
  getOwnedById(req, res, next) {
    try {
      let user = User.findByPk(req.user.id)
      if (user == null) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      let stream = Stream.findOne({
        where: {
          id: req.params["id"],
          userId: user.id
        },
      });

      if (stream == null) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      let response = new Response(200, stream, "Sukses")
      return res.status(response.status).json(response.getData())
    } catch (e) {
      next(e)
    }
  }

  // Publish function for authenticating and publishing from rtmp server request
  publish(req, res, next) {
    try {
      let streamId = req.body.name
      let streamKey = req.body.key

      let stream = Stream.findByPk(streamId, {
        where: {
          streamKey: streamKey
        }
      })
      if (stream == null) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      Stream.update(
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
  destroy(req, res, next) {
    try {
      let streamId = req.body.name
      let streamKey = req.body.key

      let stream = Stream.findByPk(streamId, {
        where: {
          streamKey: streamKey
        }
      })
      if (stream == null) {
        return next(ApiError.badRequest("Id tidak valid"))
      }

      stream.destroy()

      let response = new Response(200, undefined, "Sukses")
      return res.status(response.status).json(response.getData())
    } catch (e) {
      next(e)
    }
  }
}

export default StreamController;
