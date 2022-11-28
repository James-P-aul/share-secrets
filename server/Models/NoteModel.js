const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/MERN");

const NoteSchema= mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
})

const NoteModel= mongoose.model('note', NoteSchema);

module.exports= NoteModel;