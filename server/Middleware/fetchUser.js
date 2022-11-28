var jwt = require('jsonwebtoken');
const JWT_SECRET = "J0y$isG00dbuoy";

const fetchUser= (req,res,next)=>{

    const token= req.headers.token;
    if(!token)
    {
        return res.json({error: "Invalid credentials"});
    }

    var decoded = jwt.verify(token, JWT_SECRET);
    req.id= decoded.id;
    next();
}

module.exports= fetchUser