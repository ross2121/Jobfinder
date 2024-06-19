const User=require("../model/user")
const {StatusCodes}=require("http-status-codes")
const {badrequest,unauthonticated}=require("../errors/index")
// const JWT=require("jsonwebtoken")

const register=async(req,res)=>{
    
//     if(!name||!email||!password){
// throw new badrequest("please provide the name,email and password");
//     }
       const user=await User.create({...req.body})
    //    const token=JWT.sign({userid:user.id,name:user.name},"jwtsecret",{expiresIn:"30d"})
    const token=user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
}
const login=async(req,res)=>{
    const {email,password}=req.body
    
    if(!email||!password){
        throw new badrequest("please provide the email and password");
    }
    const user=await User.findOne({email})
    // console.log(user);
if(!user){
    throw new unauthonticated("invalid credential");
}
// compare password

const ispassword= await user.comparepassword(password);

if(!ispassword){
throw new unauthonticated("invalid credaintaial password");

}
const token=user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

module.exports={register,login};