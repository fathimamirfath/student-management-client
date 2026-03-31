import React, { useContext, useState } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";   
import { MainContext } from "../context/MainContext";

const Loginpage = () => {

  const navigate = useNavigate();   

  const { login } = useContext(MainContext);   
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (e)=> {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    const res = await login(userData);  

    if(res){
      alert("Login Successful ");
      navigate("/dashboard");   
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="bg">

    


      <div className="login-right">
        <div className="login-rightinbox">

          

          <p className="login-divider">
            <TfiLayoutLineSolid /> Or sign in with email <TfiLayoutLineSolid />
          </p>

          <form onSubmit={handleSubmit}> 

            <div className="login-line1">
              <IoPersonCircleOutline className="icon" />
              <input 
                type="text" 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}  
                placeholder="Email" 
              />
            </div>

            <div className="login-line1">
              <MdLockOutline className="icon" />
              <input 
                type="password" 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)} 
                placeholder="Password" 
              />
            </div>

            <button className="bottom">Log In</button>

            <p className="login-signup">
              Don’t have an account? 
              <button 
                type="button"   
                className="button2" 
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </p>

          </form>
        </div>
      </div>

    </div>
  );
};

export default Loginpage;