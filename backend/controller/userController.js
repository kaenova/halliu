/**
 * @module UserController
 */

import { User, Sequelize } from "../models";
import ApiError from "../utils/apiError";
import { Response } from "../utils/response.js";

/**
 * UserController berfungsi untuk mengelola register, login, token, dan pencarian User.
 */
class UserController {
  constructor() { }

  /**
   * Register akun user baru
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} next 
   * 
   */
  async register(req, res, next) {
    try {
      var user = await User.findOne({
        where: { email: req.body["email"]}})

      if (user != null) {
        return next(ApiError.badRequest("Email sudah pernah didaftarkan"))
      }

      let a = await User.build({
        name: req.body["name"],
        email: req.body["email"].toLowerCase(),
        password: req.body["password"],
        role: req.body["role"],
      });

      // // Percobaan method di model Sequelize
      // a.changePassword("test")
      await a.save()

      let response = new Response(200, null, "Sukses");
      return res.status(response.status).json(response.getData());
    } catch (e) {
      next(e);
    }
  }

  /**
    * Login user ke akunnya dengan Email dan Password; serta membuat token JWT
    * @param {Request} req 
    * @param {Response} res 
    * @param {*} next 
    * 
    */
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

  /**
    * Memperbarui token JWT
    * @param {Request} req 
    * @param {Response} res 
    * @param {*} next 
    * 
    */
  async renewToken(req, res, next) {
    try {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: ["id", "name", "email", "role"],
      });

      if (!user instanceof User) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
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

  /**
    * Mendapatkan user menggunakan ID User yang terotentikasi
    * @param {Request} req 
    * @param {Response} res 
    * @param {*} next 
    * 
    */
  async self(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ["id", "name", "email", "role"],
      });

      if (!user instanceof User) {
        return next(ApiError.unauthorized("User tidak ditemukan"));
      }

      let response = new Response(200, user["dataValues"], "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (e) {
      next(e);
    }
  }

  /**
    * Mendapatkan user menggunakan ID User
    * @param {Request} req 
    * @param {Response} res 
    * @param {*} next 
    * 
    */
  async getUserById(req, res, next) {
    try {
      req.params.id = parseInt(req.params.id);

      const user = await User.findByPk(req.params.id, {
        attributes: ["name", "role"],
      });
      if (!user instanceof User) {
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
