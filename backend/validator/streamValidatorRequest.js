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
      console.log("masukk")
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
}
