import { User, Sequelize } from "../models";
import ApiError from "../utils/apiError";
import { Response } from "../utils/response.js";

class UserController {
  constructor() { }

  // Registering User by Email, Password, Name, Role
  register(req, res, next) {
    try {
      let a = User.build({
        name: req.body["name"],
        email: req.body["email"].toLowerCase(),
        password: req.body["password"],
        role: req.body["role"],
      });

      // // Percobaan method di model Sequelize
      // a.changePassword("test")
      a.save()

      let response = new Response(200, null, "Sukses");
      return res.status(response.status).json(response.getData());
    } catch (e) {
      next(e);
    }
  }

  // Login User by Email, Password
  // Creating JWT token
  async login(req, res, next) {
    try {
      var user = await User.findOne({
        where: { email: req.body["email"], password: req.body["password"] },
        attributes: ["id", "name", "email", "role"],
      });
      if (user == null) {
        return next(ApiError.badRequest("Email atau Password salah"));
      }

      let token = await user.createJWT();
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
    } catch (e) {
      next(e);
    }
  }

  // Renewing JWT token
  renewToken(req, res, next) {
    try {
      const user =  User.findOne({
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
    } catch (e) {
      next(e);
    }
  }

  // Getting Requested User
  self(req, res, next) {
    try {
      const user =  User.findByPk(req.user.id, {
        attributes: ["id", "name", "email", "role"],
      });

      if (user == null) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
      }

      let response = new Response(200, user["dataValues"], "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (e) {
      next(e);
    }
  }

  // Getting Requested User by ID
  getUserById(req, res, next) {
    try {
      req.params.id = parseInt(req.params.id);

      const user =  User.findByPk(req.params.id, {
        attributes: ["name", "role"],
      });
      if (user == null) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
      }

      let response = new Response(200, user["dataValues"], "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (e) {
      next(e)
    }
  }
}

export default UserController;
