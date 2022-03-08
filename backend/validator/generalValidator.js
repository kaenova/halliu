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
}
