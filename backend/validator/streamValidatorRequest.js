import { body } from "express-validator";
import validator from "validator";
import ApiError from "../utils/apiError";
import GeneralValidator from "./generalValidator";

export default class StreamValidatorReqeust extends GeneralValidator {
  constructor() {
    super();
  }

  validateCraete(req, res, next) {
    // Check if all mandatory fields are filled
    if (
      req.body["title"] == undefined ||
      req.files["cover"] == undefined
    ) {
      return next(ApiError.badRequest("Title dan Image tidak boleh kosong"));
    }

    // If title is empty
    if (validator.isEmpty(req.body["title"])) {
      next(ApiError.badRequest("Title tidak boleh kosong"))
      return;
    }

    // Check image
    let image = req.files["cover"][0];
    if (image["mimetype"] != "image/jpeg" || image["size"] > 9000000) {
      return next(ApiError.badRequest("Upload image tidak valid"));
    }

    next();
  }

  validateIdParams(req, res, next) {
    if (req.params["id"] == undefined) {
      return next(ApiError.badRequest("Id tidak boleh kosong"));
    }

    if (!validator.isInt(req.params["id"])) {
      return next(ApiError.badRequest("Id tidak valid"))
    } else {
      req.body.name = parseInt(req.body.name)
    }

    if (req.params["id"] < 1) {
      return next(ApiError.badRequest("Id tidak valid"))
    }

    next()
  }

  validatePublishDestroy(req, res, next) {
    if (req.body.key == undefined || req.body.name == undefined) {
      return next(ApiError.badRequest("Id tidak valid"))
    }

    if (!validator.isInt(req.body.name)) {
      return next(ApiError.badRequest("Id tidak valid"))
    } else {
      req.body.name = parseInt(req.body.name)
    }
    next()
  }
  
}
