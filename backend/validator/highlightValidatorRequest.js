import validator from "validator";
import ApiError from "../utils/apiError";
import GeneralValidator from "./generalValidator";

export default class HighlightValidatorReqeust extends GeneralValidator {
  constructor() {
    super();
  }

  validateCraete(req, res, next) {
    // Check if all mandatory fields are filled
    if (
      req.body["title"] == undefined ||
      req.files["image"] == undefined ||
      req.files["video"] == undefined
    ) {
      return next(ApiError.badRequest("Title, Image, dan Video tidak boleh kosong"));
    }

    // If title is empty
    if (validator.isEmpty(req.body["title"])) {
      return next(ApiError.badRequest("Title tidak boleh kosong"));
    }

    // Check image
    let image = req.files["image"][0];
    if (image["mimetype"] != "image/jpeg" || image["size"] > 9000000) {
      return next(ApiError.badRequest("Upload image tidak valid"));
    }

    // Check video
    let video = req.files["video"][0];
    if (video["mimetype"] != "video/mp4" || video["size"] > 100000000) {
      return next(ApiError.badRequest("Upload video tidak valid"));
    }

    next();
  }
}
