const asyncHandler =require('express-async-handler')
const User = require('../models/userModel')
const jwt =require("jsonwebtoken")
const bcrypt=require("bcrypt")


//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
  
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedPassword);
  
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
  console.log("it is running")
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
  });


//@access public
const loginUser=asyncHandler( async (req,res) =>{
const {email,password}=req.body
if(!email || !password){
  res.status(400)
  throw new Error("both fields are required")
}
const user=await User.findOne({email})
//compare password with the hashed password
if(user && (await bcrypt.compare(password, user.password))){
  const accesToken= jwt.sign({
    user:{
      username:user.username,
      email:user.email,
      id:user._id
    }
  },
process.env.JWT_SECRET, {expiresIn:"10m"})
  res.status(200).json({accesToken})
}
else {
  res.status(401)
  throw new Error("invalid username or password")
}

})

//@access private
const currentUser=asyncHandler( async (req,res) =>{
    res.json(req.user)

})



module.exports={registerUser, loginUser,currentUser}