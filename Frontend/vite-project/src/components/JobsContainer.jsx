import { useAppContext } from "../context/appcontext";
import { useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job";
import Alert from "./Alert";
import Wrapper from "../assets/wrapper/JobsContainer";
import pageBtnContainer from "./pageBtnContainer"
const JobsContainer=()=>{
    const{
        getJobs,
        jobs,
        isLoading,
        page,
        totalJobs,
        search,
        searchStatus,
        searchType,
        sort,
        numOfPages,
        showAlert,
    }=useAppContext();
    useEffect(()=>{
        getJobs();
    },[page,search,searchStatus,searchType,sort]);
    if(isLoading){
        return <Loading center/>
    }
    if(jobs.length===0){
        return(
            <Wrapper>
            <h2>No jobs to display....</h2>
            </Wrapper>
        )
    }

    return(
        <Wrapper>
            {showAlert&&<Alert>
                </Alert>}
                <h5>
                    {totalJobs}job{jobs.length>1&&'s'}found
                </h5>
                <div className="jobs">
                 {jobs.map((job)=>{
                  return <Job key={job._id}{...job}/>
                 })}
                </div>
                {numOfPages>1&&<pageBtnContainer> </pageBtnContainer>}
        </Wrapper>
    )
}
