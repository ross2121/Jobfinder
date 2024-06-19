const jobs=require("../model/jobs")
const {StatusCodes}=require("http-status-codes");
const{badrequest,notfound}=require("../errors/index");
const getalljobs=async(req,res)=>{
    const job=await jobs.find({createdBy:req.user.userId}).sort("createdAt")
    res.status(StatusCodes.OK).json({job,count:job.length});
}
const getjob=async(req,res)=>{
    const{
        user:{userId},
        params:{id:jobId}
    }=req
    const job=await jobs.findOne({
        _id:jobId,
        createdBy:userId,
    })
    if(!job){
        throw new notfound(`no job found with this id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job});
}
const createjob=async(req,res)=>{
    req.body.createdBy=req.user.userId
    const job=await jobs.create(req.body);
    res.status(StatusCodes.CREATED).json({job})
    // res.json(req.user);
}
const updatejob=async(req,res)=>{
   const{
     body:{company,position},
     user:{userId},
     params:{id:jobId},
   }=req
   if(company===""||position===""){
    throw new badrequest("company or position fields cannot be empty")

   }
   const job=await jobs.findByIdAndUpdate({
    _id:jobId,createdBy:userId
   },
req.body,
{new:true,runValidators:true}
)
if(!job){
    throw new notfound(`no found with id ${jobId}`)
}
    res.status(StatusCodes.OK).json({job});
}

const deletejob=async(req,res)=>{
    const{
    user:{userId},
    params:{id:jobId},
    }=req
    const job=await jobs.findByIdAndDelete({
        _id:jobId,
        createdBy:userId,
    })
    if(!job){
        throw new notfound(`no job with ${jobId}`)
    }
 res.status(StatusCodes.OK).send();
}
module.exports={getalljobs,getjob,createjob,updatejob,deletejob}