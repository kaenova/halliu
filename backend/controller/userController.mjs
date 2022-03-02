import { User } from "../model/index.mjs";
import validator from "validator";
import Response from "../utils/response.mjs";

class UserController {

  static async register(req, res) {
    try {
      if (!validator.isEmail(req.body["email"]) || validator.isEmpty(req.body["nama"] || validator.isStrongPassword(req.body["password"] || validator.isEmpty(req.body["role"])))) {
        let response = new Response(400, null, "Email atau Password tidak valid");
        res.status(response.status).json(response.getData())
        return
      }

      await User.build({nama: req.body["nama"], email: req.body["email"], password: req.body["password"], role: req.body["role"]}).save()

      let response = new Response(200, null, "Sukses");

      return res.status(response.status).json(response.getData());
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {

      if (!validator.isEmail(req.body["email"]) || validator.isStrongPassword(req.body["password"])) {
        let response = new Response(400, null, "Email atau Password tidak valid");
        res.status(response.status).json(response.getData())
        return
      }
      const user = await User.findOne({where: {email: req.body["email"], password: req.body["password"]}});

      if (user == null) {
        let response = new Response(400, null, "Email atau Password tidak terdaftar");
        res.status(response.status).json(response.getData())
        return
      }

      let token = user.createJWT();
      let userData = user["dataValues"]
      userData["token"] = token;
      let response = new Response(200, userData, "Sukses");
      res.status(response.status).json(response.getData())
      return
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async self(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      let response = new Response(200, user["dataValues"], "Sukses");
      res.status(response.status).json(response.getData())
      return
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

export default UserController;