import { User, Sequelize } from "../models";
import ApiError from "../utils/apiError";
import { Response } from "../utils/response.js";

class UserController {
  constructor() {}

  // Registering User by Email, Password, Name, Role
  async register(req, res, next) {
    await User.build({
      name: req.body["name"],
      email: req.body["email"].toLowerCase(),
      password: req.body["password"],
      role: req.body["role"],
    }).save();

    let response = new Response(200, null, "Sukses");
    return res.status(response.status).json(response.getData());
  }

  // Login User by Email, Password
  // Creating JWT token
  async login(req, res, next) {
    var user = await User.findOne({
      where: { email: req.body["email"], password: req.body["password"] },
      attributes: ["id", "name", "email", "role"],
    });

    if (user == null) {
      return next(ApiError.badRequest("Email atau Password salah"));
    }

    let token = user.createJWT();
    let userData = user["dataValues"];
    userData["token"] = token;
    let response = new Response(200, userData, "Sukses");
    res
      .cookie("token", userData["token"], {
        expires: new Date(Date.now() + 24 * 3600000),
      })
      .status(response.status)
      .json(response.getData());
    return;
  }

  // Renewing JWT token
  async renewToken(req, res, next) {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "name", "email", "role"],
    });

    if (user == null) {
      return next(ApiError.unauthorized("User tidak ditemukan"));
    }

    let token = user.createJWT();
    let userData = user["dataValues"];
    userData["token"] = token;
    let response = new Response(200, userData, "Sukses");
    res
      .cookie("token", userData["token"], {
        expires: new Date(Date.now() + 24 * 3600000),
      })
      .status(response.status)
      .json(response.getData());
    return;
  }

  // Getting Requested User
  async self(req, res, next) {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role"],
    });

    if (user == null) {
      return next(ApiError.unauthorized("User tidak ditemukan"));
    }

    let response = new Response(200, user["dataValues"], "Sukses");
    res.status(response.status).json(response.getData());
    return;
  }

  // Getting Requested User by ID
  async getUserById(req, res, next) {
    req.params.id = parseInt(req.params.id);

    const user = await User.findByPk(req.params.id, {
      attributes: ["name", "role"],
    });
    if (user == null) {
      return next(ApiError.unauthorized("User tidak ditemukan"));
    }

    let response = new Response(200, user["dataValues"], "Sukses");
    res.status(response.status).json(response.getData());
    return;
  }
}

export default UserController;
