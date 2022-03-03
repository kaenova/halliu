import {SupportMessage, Sequelize} from '../models';
import express from 'express';

class SupportController {
  static async index(req, res) {
    try {

    } catch {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      let userID = req.user.id
      console.log(req.files)
      res.status(200).json({message: 'success'})
      return
    } catch {
      res.status(500).json({ error: error.message });
    }
  }

  static async reply(req, res) {
    try {
      let userID = req.user.id;
      let supportID = req.params.supportId;
    } catch {
      res.status(500).json({ error: error.message });
    }
  }

  static async getByID(req, res) {
    try {

    } catch {
      res.status(500).json({ error: error.message });
    }
  }
}

export default SupportController;