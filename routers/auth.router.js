import express from "express";
import {
  createSignupUser,
  handleLogin,
  handleLogout,
  renderLoginPage,
  renderSignupPage,
} from "../controllers/authUser.controllers.js";
import { signupUserValidation } from "../middelweares/signupUserValidation.js";

const router = express.Router();

router
  .route("/signup")
  .get(renderSignupPage)
  .post(signupUserValidation, createSignupUser);

router.route("/login").get(renderLoginPage).post(handleLogin);

router.route("/logout").get(handleLogout);

export default router;
