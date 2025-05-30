const asyncHandler =require("express-async-handler")
const jwt= require("jsonwebtoken")


const validateToken=asyncHandler(async (req, res, next) =>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization
    if(authHeader&& authHeader.startsWith("Bearer")){
        token= authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
            if(err){
                res.status(401)
                throw new Error("User is not authorized")
            }
            console.log(decoded);
            req.user= decoded.user
            next()
        })
    }
    else {
        res.status(401)
        throw new Error("no token provided")
    }
})

module.exports= validateToken;