import { useState } from "react";
import { Fromrow,Alert } from "../components";
import { useAppContext } from "../context/appcontext";
import Wrapper from "../assets/wrapper/DashboardFormPage";
const profile=()=>{
  const {user,showAlert,displayAlert,updateUser,isLoading}=useAppContext();
  const [name,setName]=useState(user?.name)
  const[email,setEmail]=useState(user?.email)
  const[lastName,setLastname]=useState(user?.lastName)
  const [location,setlocation]=useState(user?.location)
  const handlesubmit=(e)=>{
    e.preventDefault();
    if(!name||!email||!lastName||!location){
      displayAlert()
      return
    }
    updateUser({name,email,lastName,location})
  }
  return(
    <Wrapper>
      <form className="form"
      onSubmit={handlesubmit}>
        <h3>profile</h3>
        {showAlert&&<Alert />}
        <div className="form-center">
          <Fromrow
          type="text"
          name="name"
          value={name}
          handlechange={(e)=>setName(e.target.value)}
          >
          </Fromrow>
          <Fromrow
          type="email"
          name="email"
          value={email}
          handlechange={(e)=>setEmail(e.target.value)}>
          </Fromrow>
          <Fromrow
          type="text"
          name="location"
          value={location}
          handlechange={(e)=>setlocation(e.target.value)}></Fromrow>  
          <button className="btn btn-block" type="submit"disabled={isLoading}>
            {isLoading?"please wait":"save cahnges"}
          </button>
                </div>
      </form>
    </Wrapper>
  )
}
export default profile