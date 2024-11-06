import { validationResult } from "express-validator";
import User from "../database/model/user.model.js";


class LoginController {

    renderLogin(req, res) {
      res.render("login",{ title: "Login", showError: false });
    }
  
    renderRegister(req, res) {
      res.render("register", { title: "Register", errors: [] });
    }
  
    login(req, res) {
      res.redirect("/tasks");
    }
  
    async register(req, res){
      const result = validationResult(req);
      if (result.isEmpty) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
  
        const user = await User.create({ name, email, password });
        console.log(user);
        return res.redirect("/login");
      }
      res.render("/register");
    }
  
  }
  
  export default LoginController;
  
