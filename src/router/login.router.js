import express from "express";
import { body } from "express-validator";

import LoginController from "../controller/login.controller.js";

const router = new express.Router();
const loginController = new LoginController();

router.get("/login", loginController.renderLogin);
router.get("/register", loginController.renderRegister);
router.post("/login", loginController.login);
router.post(
  "/register",
  body("name").notEmpty().trim(),
  body("email").notEmpty().isEmail().trim(),
  body("password").notEmpty().trim(),
  
  loginController.register
);

export default router;
