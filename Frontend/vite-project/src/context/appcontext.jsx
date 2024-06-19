import React,{useReducer,useContext,useEffect} from 'react'
import reducer from "./reducer";
import axios from "axios"
import  {DISPLAY_ALERT,
CLEAR_ALERT,
SETUP_USER_BEGIN,
SETUP_USER_SUCCESS,
SETUP_USER_ERROR,
TOGGLE_SIDEBAR,
LOGOUT_USER,
UPDATE_USER_BEGIN,
UPDATE_USER_SUCCESS,
UPDATE_USER_ERROR,
HANDLE_CHANGE,
CLEAR_VALUES,
CREATE_JOB_BEGIN,
CREATE_JOB_SUCCESS,
CREATE_JOB_ERROR,
GET_JOBS_BEGIN,
GET_JOBS_SUCCESS,
SET_EDIT_JOB,
DELETE_JOB_BEGIN,
DELETE_JOB_ERROR,
EDIT_JOB_BEGIN,
EDIT_JOB_SUCCESS,
EDIT_JOB_ERROR,
SHOW_STATS_BEGIN,
SHOW_STATS_SUCCESS,
CLEAR_FILTERS,
CHANGE_PAGE,
GET_CURRENT_USER_BEGIN,
GET_CURRENT_USER_SUCCESS}from "./action"
const initialState = {
    userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    userLocation: '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  };
  const AppContext=React.createContext();
const AppProvider=({children})=>{
    const[state,dispatch]=useReducer(reducer,initialState);
    const authfetch=axios.create({
        baseURL:"/api/v1",
    });
    authfetch.interceptors.response.use((response)=>{
        return response;
    },
    (error)=>{
      if(error.response.status===401){
       logoutuser();
      }
      return Promise.reject(error);
    }
)
};
const displayAlert=()=>{
  dispatch({type:DISPLAY_ALERT});
  clearAlert();
}
const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
const setupUser=async({currentUser,endPoint,alertText})=>{
    dispatch({type:SETUP_USER_BEGIN});
    try {
        const {data}=await axios.post(`/api.v1.auth/${endPoint}`,
        currentUser);
        const{user,location}=data;
        dispatch({
            type:SETUP_USER_SUCCESS,
            payload:{user,location,alertText},
        });
    } catch (error) {
        dispatch({
            type:SETUP_USER_ERROR,
            payload:{msg:error.response.data.msg},
        })
    
    }
    clearAlert();
}
const togglesidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const logoutUser=async()=>{
    await authfetch.get("/auth/logout");
    dispatch({type:LOGOUT_USER});
  }
  const updateUser=async(currentUser)=>{
    dispatch({type:UPDATE_USER_BEGIN});
    try{
        const {data}=await authfetch.patch("/auth/updateUser",currentUser);
        const{user,location}=data;
        dispatch({
            type:UPDATE_USER_SUCCESS,
            payload:{user,location},
        });
    }catch(error){
        if(error.response.status!==401){
            dispatch({
                type:UPDATE_USER_ERROR,
                payload:{msg:error.response.data.msg}
            })
        }
    }
 clearAlert();
  }
  const handlechange=({name,value})=>{
    dispatch({type:HANDLE_CHANGE,
        payload:{name,value}
    })
  };
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };
  const createJob=async()=>{
    dispatch({type:CREATE_JOB_BEGIN});
    try {
        const {position,company,jobLocation,jobType,status}=state;
        await authfetch.post("/jobs",{
            position,
            company,
            jobLocation,
            jobType,
            status,
        });
        dispatch({type:CREATE_JOB_SUCCESS});
        dispatch({type:CLEAR_VALUES});
    } catch (error) {
        if(error.response.status===401)return;
        dispatch({
            type:CREATE_JOB_ERROR,
            payload:{msg:error.response.data.msg}
        });
    }
   clearAlert();
  }
const getJobs=async()=>{
    const {page,search,searchStatus,searchType,sort}=state;
    let url=`/jobs?page=${page}&status=${searchStatus}&jobtype=${searchType}&sort=${sort}`;
    if(search){
        url=url+`&search=${search}`;
    }
    dispatch({type:GET_JOBS_BEGIN});

try {
    const {data}=await authfetch(url);
    const {jobs,totalJobs,numOfPages}=data;
    dispatch({
        type:GET_JOBS_SUCCESS,
        payload:{
            jobs,
            totalJobs,
            numOfPages,
        },
    });
} catch (error) {
    logoutUser();
}clearAlert();
};
const setEditJob=async()=>{
    dispatch({type:SET_EDIT_JOB,payload:{id}});
}
const editJob=async()=>{
dispatch({type:EDIT_JOB_BEGIN});
try{
    const{position,company,jobLocation,jobType,status}=state;
    await authfetch.patch(`/jobs.${state.editJobId}`,{
        company,
        position,
        jobLocation,
        jobType,
        status,
    });
    dispatch({type:EDIT_JOB_SUCCESS});
    dispatch({type:CLEAR_VALUES});
}
catch(error){
    if(error.response.status===401)return;
    dispatch({
        type:EDIT_JOB_ERROR,
        payload:{msg:error.response.data.msg},
    });
}
clearAlert();
}
const deletejob=async(jobId)=>{
    dispatch({type:DELETE_JOB_BEGIN});
    try {
        await authfetch.delete(`/jobs/${jobId}`);
        getjobs();
    } catch (error) {
        if(error.response.status===401)return;
        dispatch({
            type:DELETE_JOB_ERROR,
            patload:{msg:error.response.data.msg},
        });
    }
    clearAlert();
}
const showstats=async()=>{
    dispatch({type:SHOW_STATS_BEGIN});
    try {
        const {data}=await authfetch('/jobs/stats');
        dispatch({
            type:SHOW_STATS_SUCCESS,
            payload:{
                stats:data.defaultStats,
                monthlyApplications: data.monthlyApplications,
            },
        });
    } catch (error) {
        logoutuser();
    }
    clearalert();
}
const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  const getCurrentUser=async()=>{
    dispatch({type:GET_CURRENT_USER_BEGIN})
    try {
        const {data}=await authfetch("/auth/getCurrentUser");
        const{user,location}=data;
        dispatch({
            type:GET_CURRENT_USER_SUCCESS,
            payload:{user,location},
        });
    } catch (error) {
        if(error.response.status==401)return;
        logoutuser();
    }
  };
  useEffect(()=>{
    getCurrentUser();
  },[]);
  const useAppContext = () => {
     useContext(AppContext);
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        togglesidebar,
        logoutUser,
        updateUser,
        handlechange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deletejob,
        editJob,
        showstats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );

  
  export  default{ AppProvider, initialState, useAppContext };