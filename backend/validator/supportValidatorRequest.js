import validator from "validator";
import GeneralValidator from "./generalValidator";

export default class SupportValidatorRequest extends GeneralValidator {
  constructor() {
    super();
  }

  validateSupportCreate(req, res, next) {
    // Check if all mandatory fields are filled
    if (req.body["message"] == undefined ) {
      req["Error"] = "Message tidak boleh kosong";
      return next();
    }
    if (validator.isEmpty(req.body["message"])) {
      req["Error"] = "Message tidak boleh kosong";
      return next();
    }

    // Check optional image and video
    if (req.files["image"] != undefined) {
      let image = req.files["image"][0];
      if (image["mimetype"] != "image/jpeg" || image["size"] > 3000000) {
        req["Error"] = "Upload image tidak valid";
        return next();
      }
    }
    
    if (req.files["video"] != undefined) {
      let video = req.files["video"][0];
      if (video["mimetype"] != "video/mp4" || video["size"] > 100000000) {
        req["Error"] = "Upload video tidak valid";
        return next();
      }
    }
    next()
  }

  validateSupportReply(req, res, next) {
    // Check if all mandatory fields are filled
    if (req.body["reply"] == undefined) {
      req["Error"] = "Reply tidak boleh kosong";
      return next();
    }

    if (validator.isEmpty(req.body["reply"])) {
      req["Error"] = "Reply tidak boleh kosong";
      return next();
    }

    // Check if params is valid
    if (req.params["id"] == undefined) {
      req["Error"] = "Id tidak boleh kosong";
      return next();
    }

    if (!validator.isInt(req.params["id"])) {
      req["Error"] = "Id tidak valid";
      return next();
    }

    next()
  }
}