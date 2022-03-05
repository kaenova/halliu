import validator from "validator";
import ApiError from "../utils/apiError";
import GeneralValidator from "./generalValidator";

export default class SupportValidatorRequest extends GeneralValidator {
  constructor() {
    super();
  }

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
