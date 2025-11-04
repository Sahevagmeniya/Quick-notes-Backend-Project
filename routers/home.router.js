import express from "express";
import {
  redirectToHomePage,
  renderHomePage,
} from "../controllers/home.controllers.js";

const router = express.Router();

router.route("/").get(redirectToHomePage);

router.route("/home").get(renderHomePage);

export default router;
