const User= require("../model/user")
const jwt=require("jsonwebtoken")
const {unauthonticated}=require("../errors/index")
const { getUserById } = require("moongose/controller/user_controller")
const auth=async(req,res,next)=>{
//  const authheader=req.headers.authorization;
 const authHeader = req.headers.authorization
if(!authHeader||!authHeader.startsWith('Bearer')){
    // console.log(error);
    throw new unauthonticated("authontication invalid")
}
const token = authHeader.split(' ')[1]
try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    // console.log("ads");
    const user = await User.findById(decoded.userId);
    req.user={userId:user._id,name:decoded.name}
    next();
} catch (error) {
    // console.log(process.env.JWT_SECRET);
   console.log(error);
    throw new unauthonticated("not authorized to this route")
}}
module.exports=auth
