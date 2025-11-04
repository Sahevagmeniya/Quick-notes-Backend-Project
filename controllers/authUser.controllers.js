import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import { validationResult } from "express-validator";

export const renderSignupPage = (req, res) => {
  res.render("signup", {
    errors: req.flash("errors").map((arr) => arr),
    oldUserData: req.flash("oldUserData"),
  });
};

export const createSignupUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash(
      "errors",
      errors.array().map((errObj) => errObj.msg)
    );
    req.flash("oldUserData", req.body);

    return res.redirect("/auth/signup");
  }

  const createdUser = await userModel.create({
    fullName,
    email,
    password,
  });

  res.redirect("/auth/login");
};

export const renderLoginPage = (req, res) => {
  res.render("login", { error: req.flash("error") });
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const loginUser = await userModel.findOne({ email });``

  if (!loginUser || !(await bcrypt.compare(password, loginUser.password))) {
    req.flash("error", "Invalid Email or Password !!");
    return res.redirect("/auth/login");
  }

  const token = jwt.sign(
    { email: loginUser.email, _id: loginUser._id },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
  res.cookie("token", token);
  res.redirect("/notes/addNotes");
};

export const handleLogout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
};
