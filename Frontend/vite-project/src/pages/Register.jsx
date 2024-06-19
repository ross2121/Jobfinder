import { useState,useEffect } from "react";
import {Logo,FormRow,Alert} from "../components"
import Wrapper from "../assets/wrapper/RegisterPage";
import { useAppContext } from "../context/appcontext";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
const initialState={
    name:'',
    email:"",
    password:"",
    isMember:true,
};
const Register=()=>{
 const navigate=useNavigate();
 const [values,setValues]=useState(initialState);
 const {user,isLoading,showAlert,displayAlert,setupUser}=useAppContext();
 const toggleMember=()=>{
    setValues({...values,isMember:!values.isMember});
 }   
 const handleChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.values})
 }
 const onSubmit=(e)=>{
    e.preventDefault();
    const{name,email,password,isMember}=values;
    if(!email||!password||(!isMember&&!name)){
        displayAlert();
        return;
    }
    const curentUser={name,email,password};
    if(isMember){
        setupUser({
            curentUser,
            endPoint:"login",
            alertText:"Login sucessfull Redirecting....",
        })
    }else{
        setupUser({
            curentUser,
            endPoint:"register",
            alertText:"User created Redirecting",
        })
    }
    useEffect(()=>{
        if(user){
            setTimeout(()=>{
                navigate("/");
            },3000);
        }
    },[user,navigate]);
 }
return(
    <Wrapper>
        <form className="form" onSubmit={onSubmit}>
            <Logo />
            <h3>{values.isMember?'Login':'Register'}</h3>
            {showAlert && <Alert />
            }
            {!values.isMember&&(
                <FormRow
                type="text"
                name="name"
                value={values.name}
                handleChange={handleChange}
                />
            )}
            <FormRow 
            type='password'
            name="password"
            value={values.password}
            handleChange={handleChange}
            />
            <button type="submit"className="btn btn-block" disabled={isLoading}>
                submit
            </button>
            <button
            type="button"
            className="btn btn-block btn-hipster"
            disabled={isLoading}
            onClick={()=>{
               setupUser({
                currentUser:{email:"test@test.com",
                    password:"secrt"},
                    endPoint:"login",
                    alertText:"Login sucessfull reditrecting"
                });
            }}>
                {isLoading?"loading....":"demo app"}
            </button>
             <p>
                {values.isMember?"not a member yet":"Alredy a member?"}
                <button type="button" onClick={toggleMember} className="member-btn">
                    {values.isMember?"Register":"Login"}
                </button>
             </p>
        </form>
    </Wrapper>
)
}
export default Register