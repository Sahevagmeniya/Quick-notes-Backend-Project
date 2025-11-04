import noteModel from "../model/note.model.js";

export const isAdmin = async (req, res, next) => {
  try {
    const note = await noteModel.findOne({ _id: req.params.noteId });

    if (!note) return res.redirect("/notes/allNotes");

    if (note.createdby.toString() !== req.user._id.toString()) {
      return res.redirect("/notes/allNotes");
    }

    next();
  } catch (err) {
    console.error(
      "MongoDb accsess faild at isAdmin check point... Error:",
      err.message
    );
    res.redirect("/notes/allNotes");
  }
};
