import ApiError from "./apiError";
import fs from 'fs'

export default function apiErrorHandler(err, req, res, next) {
  // Cleanup all files
  if (req.files != undefined) {
    for (let key in req.files) {
      for (let i = 0; i < req.files[key].length; i++) {
        let file = req.files[key][i];
        fs.unlinkSync(file.path);
      }
    }
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }
  console.log(err)
  return res.status(500).json({
    status: 500,
    message: "Internal Server Error",
  });
}
