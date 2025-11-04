import { isLogin } from "../middelweares/isLogin.js";
import express from "express";
import {
  createNote,
  deleteNoteById,
  editNoteById,
  renderAddNotePage,
  renderAllNotesPage,
  renderEditNotePageById,
} from "../controllers/notes.controllers.js";
import { isAdmin } from "../middelweares/isAdmin.js";

const router = express.Router();

router
  .route("/addNotes")
  .get(isLogin, renderAddNotePage)
  .post(isLogin, createNote);

router.route("/allNotes").get(isLogin, renderAllNotesPage);

router.route("/deleteNote/:noteId").post(isLogin, isAdmin, deleteNoteById);

router
  .route("/editNote/:noteId")
  .get(isLogin, isAdmin, renderEditNotePageById)
  .post(isLogin, isAdmin, editNoteById);

export default router;
