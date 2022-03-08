import validator from "validator";
import ApiError from "../utils/apiError";
import GeneralValidator from "./generalValidator";

export default class UserValidatorRequest extends GeneralValidator {
  constructor() {
    super();
  }

  validateUserLogin(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    // Check if the mandatory fields are not included
    if (email == undefined || password == undefined) {
      return next(ApiError.badRequest("Email dan Password tidak boleh kosong"));
    }
    // Check if mandatory fields are empty
    if (
      validator.isStrongPassword(password) == false ||
      validator.isEmpty(email) == true
    ) {
      return next(ApiError.badRequest("Email dan Password tidak valid"));
    }
    next();
  }

  validateUserRegister(req, res, next) {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;

    // Check if the mandatory fields are not included
    if (
      name == undefined ||
      email == undefined ||
      password == undefined ||
      role == undefined
    ) {
      return next(
        ApiError.badRequest(
          "Name, Email, Password, dan Role tidak boleh kosong"
        )
      );
    }
    // Check if the password is strong
    if (validator.isStrongPassword(password) == false) {
      return next(ApiError.badRequest("Password tidak valid"));
    }

    // Check if one of mandatory fields are empty or role not valid
    if (
      validator.isEmpty(name) ||
      validator.isEmpty(email) ||
      validator.isEmpty(password) ||
      validator.isEmpty(role) ||
      !UserValidatorRequest.ValidateEmail(email) ||
      (req.body["role"] !== "reg" && req.body["role"] !== "cs")
    ) {
      return next(
        ApiError.badRequest(
          "Name, Email, Password, dan Role tidak boleh kosong"
        )
      );
    }

    next();
  }

  validateUserID(req, res, next) {
    // Check if params is valid
    if (req.params["id"] == undefined) {
      return next(ApiError.badRequest("ID tidak boleh kosong"));
    }

    if (!validator.isInt(req.params["id"])) {
      return next(ApiError.badRequest("ID tidak valid"));
    }
    next();
  }
}
