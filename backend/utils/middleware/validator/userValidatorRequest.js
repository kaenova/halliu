import validator from "validator"

export default class UserValidatorRequest {
  static validateUserLogin(req, res, next) {
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

  static validateUserRegister(req, res, next) {
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

    // Check if one of mandatory fields are empty
    if (validator.isEmpty(name) == true || validator.isEmpty(email) == true || validator.isEmpty(password) == true || validator.isEmpty(role) == true) {
      req["Error"] = "Nama, Email, Password, atau Role tidak boleh kosong"
      return next()
    }
    
    next()
  }
}