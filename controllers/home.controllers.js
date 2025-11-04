import jwt from "jsonwebtoken";

export const redirectToHomePage = (req, res) => {
  res.redirect("/home");
};

export const renderHomePage = (req, res) => {
  let tokenData = false;

  if (req.cookies.token) {
    try {
      tokenData = jwt.verify(req.cookies.token, process.env.SECRET);
    } catch (err) {
      console.error(
        "JWT verification failed at homePage rendring !! Error:",
        err.message
      );
      tokenData = false;
    }
  }

  res.render("home", { tokenData });
};
