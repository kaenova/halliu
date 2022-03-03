import { User, Sequelize } from "../models";
import validator from "validator";
import { Response } from "../utils/response.js";

class UserController {
  static async register(req, res) {
    try {
      if (
        !validator.isEmail(req.body["email"]) ||
        validator.isEmpty(req.body["name"]) ||
        !validator.isStrongPassword(req.body["password"]) ||
        validator.isEmpty(req.body["role"]) ||
        (req.body["role"] !== "reg" && req.body["role"] !== "cs")
      ) {
        let response = new Response(
          400,
          null,
          "Email atau Password tidak valid"
        );
        res.status(response.status).json(response.getData());
        return;
      }
      await User.build({
        name: req.body["name"],
        email: req.body["email"].toLowerCase(),
        password: req.body["password"],
        role: req.body["role"],
      }).save();

      let response = new Response(200, null, "Sukses");

      return res.status(response.status).json(response.getData());
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      if (
        !validator.isEmail(req.body["email"]) ||
        !validator.isStrongPassword(req.body["password"])
      ) {
        let response = new Response(
          400,
          null,
          "Email atau Password tidak valid"
        );
        res.status(response.status).json(response.getData());
        return;
      }
      const user = await User.findOne({
        where: { email: req.body["email"], password: req.body["password"] },
        attributes: ["id", "name", "email", "role"],
      });

      if (user == null) {
        let response = new Response(
          400,
          null,
          "Email atau Password tidak terdaftar"
        );
        res.status(response.status).json(response.getData());
        return;
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
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async renewToken(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.user.id },
        attributes: ["id", "name", "email", "role"],
      });
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
      res.status(500).json({ error: error.message });
    }
  }

  static async self(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ["id", "name", "email", "role"],
      });
      let response = new Response(200, user["dataValues"], "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      req.params.id = parseInt(req.params.id);
      const user = await User.findByPk(req.params.id, {
        attributes: ["name", "role"],
      });
      let response = new Response(200, user["dataValues"], "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserController;
