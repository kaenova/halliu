/**
 * @module RequestValidator
 */

import validator from "validator";
import ApiError from "../utils/apiError";
import GeneralValidator from "./generalValidator";

/**
 * Kelas validator yang digunakan untuk melakukan validasi pada suatu entitas SupportMessage
 * @extends GeneralValidator
 */
class SupportValidatorRequest extends GeneralValidator {
  constructor() {
    super();
  }

  /**
   * Middleware yang digunakan untuk melakukan validasi request pembuatan SupportMessage
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
  validateSupportCreate(req, res, next) {
    // Check if all mandatory fields are filled
    if (req.body["message"] == undefined) {
      return next(ApiError.badRequest("Message tidak boleh kosong"));
    }
    if (validator.isEmpty(req.body["message"])) {
      return next(ApiError.badRequest("Message tidak boleh kosong"));
    }

    // Check optional image and video
    if (req.files["image"] != undefined) {
      let image = req.files["image"][0];
      if (image["mimetype"] != "image/jpeg" || image["size"] > 3000000) {
        return next(ApiError.badRequest("Image tidak valid"));
      }
    }

    if (req.files["video"] != undefined) {
      let video = req.files["video"][0];
      if (video["mimetype"] != "video/mp4" || video["size"] > 100000000) {
        return next(ApiError.badRequest("Video tidak valid"));
      }
    }
    next();
  }

  /**
   * Middleware yang digunakan untuk melakukan validasi request untuk mereply 
   * suatu SupportMessage
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   */
  validateSupportReply(req, res, next) {
    // Check if all mandatory fields are filled
    if (req.body["reply"] == undefined) {
      return next(ApiError.badRequest("Reply tidak boleh kosong"));
    }

    if (validator.isEmpty(req.body["reply"])) {
      req["Error"] = "Reply tidak boleh kosong";
      return next(ApiError.badRequest("Reply tidak boleh kosong"));
    }

    // Check if params is valid
    if (req.params["supportId"] == undefined) {
      return next(ApiError.badRequest("Id tidak boleh kosong"));
    }

    if (!validator.isInt(req.params["supportId"])) {
      return next(ApiError.badRequest("Id tidak valid"));
    }

    next();
  }
}

export default SupportValidatorRequest