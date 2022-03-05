import validator from "validator";
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
      req["Error"] = "Title, Image, dan Video tidak boleh kosong";
      return next();
    }

    // If title is empty
    if (validator.isEmpty(req.body["title"])) {
      req["Error"] = "Title tidak boleh kosong";
      return next();
    }

    // Check image
    let image = req.files["image"][0];
    if (image["mimetype"] != "image/jpeg" || image["size"] > 9000000) {
      req["Error"] = "Upload image tidak valid";
      return next();
    }

    // Check video
    let video = req.files["video"][0];
    if (video["mimetype"] != "video/mp4" || video["size"] > 100000000) {
      req["Error"] = "Upload video tidak valid";
      return next();
    }

    next();
  }
}
