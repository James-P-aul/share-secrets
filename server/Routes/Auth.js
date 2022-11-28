const express = require("express");
const UserModel = require("../Models/UserModel");
const Router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const e = require("express");
const JWT_SECRET = "J0y$isG00dbuoy";
const fetchUser= require("../Middleware/fetchUser");



Router.post("/createUser", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    let user = await UserModel.findOne({ email });
    if (user) {
        return res.json({ error: "Invalid credentials" });
    }
    else {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        user = await UserModel.create({
            name: name,
            email: email,
            password: hash
        });

        const data = {
            id: user._id
        };
        var token = jwt.sign(data, JWT_SECRET);

        return res.json({ status: "succes", token });
    }
});

Router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // console.log(email+" "+password);

    let user = await UserModel.findOne({ email });
    if (!user) {
        return res.json({ error: "Invalid credentials" });
    }
    else {
        if (bcrypt.compareSync(password, user.password)) {
            const data= {
                id: user._id
            };
            var token = jwt.sign(data, JWT_SECRET);
            return res.json({status:"success", token});
        }
        else
        {
            return res.json({status:"failed"});
        }
    }
})

Router.post("/getUser", fetchUser, async(req,res)=>{
    const id= req.id;
    let user= await UserModel.findOne({_id:id});
    if(!user)
    {
        return res.json({error: " invalid creentials"});
    }
    else
    {
        return res.json({user});
    }
})

module.exports = Router