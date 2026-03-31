import React, { useContext } from "react";
import './Register.css'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoCheckbox } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";
import { MainContext } from "../context/MainContext";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {

  const Navigate = useNavigate()

const {signup } = useContext(MainContext)

const [name,setName] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')


const handleSubmit = async (e)=> {
  e.preventDefault();

  const userData = {
    name : name,
    email : email,
    password : password
  }

  await signup(userData)
  setName('')
  setEmail('')
  setPassword('') 
}


  return (
    <>
      <div className="bg">
      
        <div className="right">
          <div className="rightinbox">


            <p className="divider">
              <TfiLayoutLineSolid /> Or sign in with email <TfiLayoutLineSolid />
            </p>

            <form onSubmit={handleSubmit}>

            <div className="line">
             <IoPersonCircleOutline className="icon3"/>
              <input className="box" type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter your username"/>
            </div>

            <div className="line">
              <MdOutlineEmail className="icon3"/>
              <input className="box" type="text" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your E-mail"/>
            </div>

            <div className="line">
              <MdLockOutline className="icon3"/>
              <input className="box" type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter your password"/>
            </div>
           

             
            <button className="bottom" onClick={() => Navigate("/")}>Sign In</button>
          
            <p className="signup">
              Already have an account? <button className="button2" onClick={() => Navigate("/")}>Sign In</button>
            </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
