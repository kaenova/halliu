import { User, Sequelize } from "../models";
import { Response } from "../utils/response.js";

class UserController {
  constructor() {}

  // Registering User by Email, Password, Name, Role
  async register(req, res) {
    try {

      // Checking role
      if (req.body["role"] !== "reg" && req.body["role"] !== "cs") {
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
      let response = new Response(500, null, error.message);
      return res.status(response.status).json(response.getData());
    }
  }

  // Login User by Email, Password
  // Creating JWT token
  async login(req, res) {
    try {

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
      let response = new Response(500, null, error.message);
      return res.status(response.status).json(response.getData());
    }
  }

  // Renewing JWT token
  async renewToken(req, res) {
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
      let response = new Response(500, null, error.message);
      return res.status(response.status).json(response.getData());
    }
  }

  // Getting Requested User
  async self(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ["id", "name", "email", "role"],
      });
      let response = new Response(200, user["dataValues"], "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (error) {
      let response = new Response(500, null, error.message);
      return res.status(response.status).json(response.getData());
    }
  }

  // Getting Requested User by ID
  async getUserById(req, res) {
    try {
      req.params.id = parseInt(req.params.id);
      const user = await User.findByPk(req.params.id, {
        attributes: ["name", "role"],
      });
      let response = new Response(200, user["dataValues"], "Sukses");
      res.status(response.status).json(response.getData());
      return;
    } catch (error) {
      let response = new Response(500, null, error.message);
      return res.status(response.status).json(response.getData());
    }
  }
}

export default UserController;
