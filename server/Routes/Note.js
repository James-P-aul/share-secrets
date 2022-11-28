const e = require("express");
const expres = require("express");
const fetchUser = require("../Middleware/fetchUser");
const NoteModel = require("../Models/NoteModel");
const UserModel = require("../Models/UserModel");

const Router = expres.Router();

Router.post("/createNote", fetchUser, async (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const user_id = req.id;

    let user = await UserModel.findOne({ _id: user_id });
    if (!user) {
        return res.json({ error: "Invaid Login" });
    }
    else {
        const note = await NoteModel.create({
            user_id,
            title,
            desc
        })

        return res.json({ status: "success", success: `created Note for user : ${user.name}` });
    }

})

Router.get("/getNotes", fetchUser, async (req, res) => {
    const user_id = req.id;
    let user = await UserModel.findOne({ _id: user_id });

    if (!user) {
        return res.json({ error: "Invalid login" });
    }
    else {
        const notes = await NoteModel.find({ user_id });
        if (notes.length === 0) {
            return res.json({ error: `Please add notes for user: ${user.name}` });

        }
        else {
            return res.json({ notes });
        }
    }

})

Router.put("/updateNote/:id", fetchUser, async (req, res) => {
    const user_id = req.id;
    const note_id = req.params.id;
    console.log(req.body);

    let note = await NoteModel.findById({ _id: note_id });

    if (!note) {
        return res.status(404).send("Note not found");
    }

    if (note.user_id.toString() !== user_id) {
        res.status(401).send("Not Allowed");
    }
    else {
        note = {};
        if (req.body.title) { note.title = req.body.title }
        if (req.body.desc) { note.desc = req.body.desc }

        console.log(note);
        await NoteModel.findByIdAndUpdate({ _id: note_id }, { $set: note });
        res.json({status: "success", success: "Note saved" });
    }
});

Router.delete("/deleteNote/:note_id", fetchUser, async (req, res) => {
    const user_id = req.id;
    const note_id = req.params.note_id
    const note = await NoteModel.findOne({ _id: note_id });
    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }
    else {
        if (note.user_id.toString() !== user_id) {
            return res.status(401).json({ error: "Note allowed" });
        }
        else {
            await NoteModel.findOneAndDelete({ _id: note._id });
            res.status(200).json({ success: "Deleted Note" });
        }
    }
})

module.exports = Router;