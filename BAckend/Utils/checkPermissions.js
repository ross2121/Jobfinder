import { unauthonticated } from "../errors";
const checkPermission=(requestUser,resourceUserId)=>{
    if(requestUser.userId===resourceUserId.toString())return
    throw new unauthonticated("Not authorized to acces this route")
}

export default checkPermission