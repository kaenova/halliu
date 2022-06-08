/**
 * @module RequestValidator
 */

import validator from "validator";

/**
 * Kelas validator yang digunakan untuk melakukan validasi yang general
 */
class GeneralValidator {

  /**
   * Validasi query page number dan memeriksa dan memperbaiki validitas 
   * dari query tersebut.
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   * 
   */
  validatePageQueryNumber(req, res, next) {
    // Check if page params is valid
    if (typeof req.query["page"] != "number") {
      req.query["page"] = 1;
      return next()
    }

    if (req.query["page"] < 1) {
      req.query["page"] = 1;
      return next()
    }

    next();
  }

  /**
   * Digunakan untuk melakukan validasi email
   * @param {string} mail 
   * @returns {boolean}
   */
  static ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }
}

export default GeneralValidator
