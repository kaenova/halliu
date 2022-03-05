import validator from "validator"
import GeneralValidator from "./generalValidator"

export default class UserValidatorRequest extends GeneralValidator {
  constructor() {
    super()
  }

  validateUserLogin(req, res, next) {
    let email = req.body.email
    let password = req.body.password

    // Check if the mandatory fields are not included 
    if (email == undefined || password == undefined) {
      req["Error"] = "Email dan Password tidak boleh kosong"
      return next()
    }

    // Check if mandatory fields are empty
    if (validator.isStrongPassword(password) == false ||
      validator.isEmpty(email) == true) {
      req["Error"] = "Kombinasi Email atau Password salah"
      return next()
    }

    next()
  }

  validateUserRegister(req, res, next) {
    let name = req.body.name
    let email = req.body.email
    let password = req.body.password
    let role = req.body.role

    // Check if the mandatory fields are not included
    if (name == undefined || email == undefined || password == undefined || role == undefined) {
      req["Error"] = "Nama, Email, Password, atau Role tidak boleh kosong"
      return next()
    }
    // Check if the password is strong
    if (validator.isStrongPassword(password) == false) {
      req["Error"] = "Password harus memiliki kombinasi huruf, angka, dan simbol"
      return next()
    }

    // Check if one of mandatory fields are empty or role not valid
    if (validator.isEmpty(name) == true || validator.isEmpty(email) == true || validator.isEmpty(password) == true || validator.isEmpty(role) == true || (req.body["role"] !== "reg" && req.body["role"] !== "cs")) {
      req["Error"] = "Nama, Email, Password, atau Role tidak valid"
      return next()
    }

    next()
  }

  validateUserID(req, res, next) {
    // Check if params is valid
    if (req.params["id"] == undefined) {
      req["Error"] = "Id tidak boleh kosong"
      return next()
    }

    if (!validator.isInt(req.params["id"])) {
      req["Error"] = "Id tidak valid"
      return next()
    }
    next()
  }

}