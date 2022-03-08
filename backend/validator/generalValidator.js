import validator from "validator";

export default class GeneralValidator {
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

  static ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }
}
