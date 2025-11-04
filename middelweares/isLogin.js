import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export const isLogin = async (req, res, next) => {
  const tokenData = req.cookies.token;
  if (!tokenData) return res.redirect("/auth/login");

  try {
    const decoded = jwt.verify(tokenData, process.env.SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    req.user = user;
    next();
  } catch (err) {
    console.error(
      "JWT verification failed at isLogin middlewear... Error:",
      err.message
    );
    res.clearCookie("token");
    return res.redirect("/auth/login");
  }
};
