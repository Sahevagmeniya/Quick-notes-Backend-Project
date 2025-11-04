import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectdb.js";
import cookieParser from "cookie-parser";
import homeRouters from "./routers/home.router.js";
import notesRouters from "./routers/notes.router.js";
import authRouters from "./routers/auth.router.js";
import session from "express-session";
import flash from "connect-flash";

dotenv.config({ path: "./.env" });

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  })
);

app.use(flash());

app.use("/", homeRouters);
app.use("/auth", authRouters);
app.use("/notes", notesRouters);

app.listen(process.env.PORT, "0.0.0.0", () =>
  console.log("Server is running at PORT:", process.env.PORT)
);
