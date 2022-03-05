function errValidatorHeader(req, res, next) {
  let err = req["Error"];

  if (err != null) {
    let message = err || "Invalid Request";

    if (req.files != {} && req.files != undefined) {
      // Remove all files
      for (let key in req.files) {
        // NOTE: only remove one file
        fs.unlinkSync(req.files[key][0]["path"]);
      }
    }

    return res.status(400).json({
      status: 400,
      data: null,
      message: message,
    });
  }

  next();
}

export default errValidatorHeader;
