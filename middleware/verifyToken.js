const jwt = require("jsonwebtoken");
require('dotenv').config();


const verifyToken = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token)
    {
        return res.status(401).json({ error : "Access Denied"});
    }

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(verified);
        
        req.user = verified;
        next()
    }
    catch{
        res.status(400).json({error :"Invalid Token"});
    }
}

module.exports = verifyToken;