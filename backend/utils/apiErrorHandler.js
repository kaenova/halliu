import ApiError from "./apiError";

export default function apiErrorHandler(err, req, res, next) {
  // Cleanup all files
  if (req.files != undefined) {
    for (let key in req.files) {
      let file = req.files[key][0];
      fs.unlinkSync(file["path"]);
    }
  }

  if (err instanceof ApiError) {
    return res.status(err.code).json({
      code: err.code,
      message: err.message,
    });
  }

  return res.status(500).json({
    code: 500,
    message: "Internal Server Error",
  });
}
