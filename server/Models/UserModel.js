const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/MERN");

const UserSchema= mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
})


const UserModel= mongoose.model('user',UserSchema);
module.exports= UserModel;