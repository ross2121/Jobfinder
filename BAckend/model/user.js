const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide name"],
        minlength:4,
        maxlength:50,

    },
    email:{
        type:String,
        required:[true,"please provide email"],
        match:[  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
        unique:[true,"this email alredy exist"],
    },
    password:{
        type:String,
        required:[true,"please provide password"],
        minlength:6,
        // maxlength:12,

    },
    

})
userschema.pre("save",async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    next();
})
// userschema.methods.getname=function(){
//     return this.name
// }

userschema.methods.createJWT=function(){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
userschema.methods.comparepassword= async function(password){
    const ismatch= await bcrypt.compare(password,this.password);
    return ismatch;
   }

module.exports=mongoose.model("User",userschema)