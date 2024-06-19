import jobs from '../../../../BAckend/model/jobs.js';
import {
    DISPLAY_ALERT,
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
    GET_CURRENT_USER_SUCCESS,
  } from './action.js';
  const reducer=(state,action)=>{
if(action.type===DISPLAY_ALERT){
    return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: 'Please provide all values!',
      };
}
if(action.type==CLEAR_ALERT){
    return{
        ...state,
        showAlert:false,
        alertType:"",
        alertText:""
    };
}
if(action.type===HANDLE_CHANGE){
    return{
        ...state,
        page:1,
        [action.payload.name]:action.payload.value,
    }
}
if(action.type===SETUP_USER_SUCCESS){
    return{
        ...state,
        isLoading:false,
        user:action.payload.user,
        userLocation:action.payload.location,
        jobLocation:action.payload.location,
        showAlert:true,
        alertType:"sucess",
alertText:action.payload.alertText
    };
}
if(action.type===SETUP_USER_ERROR){
    return{
        ...state,
        isLoading:false,
        showAlert:true,
        alertType:"danger",
        alertText:action.payload.msg,
    };
}
if(action.type==GET_JOBS_BEGIN){
    return{...state,
        isLoading:true,
        showAlert:false}
}
if(action.type===GET_JOBS_SUCCESS){
    return{
        ...state,
        isLoading:false,
        jobs:action.payload.jobs,
        totalJobs:action.payload.totalJobs,
        numofPages:action.payload.numofPages,
      
    };
}
if(action.type===SET_EDIT_JOB){
    const job=state.jobs.find((job)=>job._id===action.payload.id);
    const{_id,position,company,jobLocation,jobtype,status}=job;
    return{
        ...state,
        isEditing:true,
        editJobId:_id,
        position,
        company,
        jobLocation,
        jobtype,
        status
    };
}
if(action.type===DELETE_JOB_BEGIN){
    return{...state,isLoading:true};
}
if(action.type===DELETE_JOB_ERROR){
    return{
        ...state,
        isLoading:false,
        showAlert:true,
        alertType:"danger",
        alertText:action.payload.msg,
    };
}
if(action===EDIT_JOB_BEGIN){
    return{
        ...state,
        isLoading:true,
    };
}
if(action.type===EDIT_JOB_SUCCESS){
    return {
        ...state,
        isLoading:false,
        showAlert:true,
        alertType:"sucess",
        alertText:"Job Updated",
    };
}
if(action.type===EDIT_JOB_ERROR){
    return {
        ...state,
        isLoading:false,
        showAlert:true,
        alertType:"dange",
        alertText:action.payload.msg,
    }
}
if(action.type===SHOW_STATS_BEGIN){
    return{
        ...state,
isLoading:true,
showAlert:false
    };
}
if(action.type===CLEAR_FILTERS){
    return{
        ...state,
        search:"",
        searchStatus:"all",
        searchType:"all",
        sort:"latest",
    };
}
if(action.type===CHANGE_PAGE){
    return{...state,page:action.payload.page};
}
if(action.type===GET_CURRENT_USER_SUCCESS){
    return{
        ...state,
        userLoading:false,
        user:action.payload.user,
        userLocation:action.payload.location,
        jobLocation:action.payload.location,
    };
}
throw new Error(`no such action:${action.type}`);
  };
  export default reducer;
