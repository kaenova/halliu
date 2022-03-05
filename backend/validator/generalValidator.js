export default class GeneralValidator {
  validatePageQueryNumber(req, res, next) {
    // Check if params is valid
    if (req.query["page"] == undefined) {
      req.query["page"] = 1;
    }

    if (!validator.isInt(req.query["page"])) {
      req.query["page"] = 1;
    }

    if (req.query["page"] < 1) {
      req.query["page"] = 1;
    }

    next()
  }
}