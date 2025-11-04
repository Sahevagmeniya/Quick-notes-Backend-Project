import userModel from "../model/user.model.js";
import noteModel from "../model/note.model.js";

export const renderAddNotePage = (req, res) => {
  res.render("addNotes");
};

export const renderAllNotesPage = async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("notes");

  res.render("allNotes", { user });
};

export const createNote = async (req, res) => {
  const { title, content } = req.body;

  const user = await userModel.findOne({ email: req.user.email });

  const createdNote = await noteModel.create({
    title,
    content,
    createdby: user._id,
  });

  user.notes.push(createdNote._id);
  await user.save();

  res.redirect("/notes/allNotes");
};

export const deleteNoteById = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    user.notes = user.notes.filter(
      (note) => note._id.toString() !== req.params.noteId
    );
    await user.save();

    await noteModel.findOneAndDelete({ _id: req.params.noteId });

    res.redirect("/notes/allNotes");
  } catch (err) {
    console.error(
      "MongoDb accsess faild at delete note... Error:",
      err.message
    );
    res.redirect("/notes/allNotes");
  }
};

export const renderEditNotePageById = async (req, res) => {
  const note = await noteModel.findOne({ _id: req.params.noteId });
  res.render("editNote", { note });
};

export const editNoteById = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    await noteModel.findOneAndUpdate(
      { _id: req.params.noteId },
      {
        title,
        content,
      }
    );
  } catch (err) {
    console.error("MongoDb accsess faild at edit note... Error:", err.message);
  }
  res.redirect("/notes/allNotes");
};
