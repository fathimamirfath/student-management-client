import React, { createContext } from "react";
import axios from "axios";

export const MainContext = createContext();

// const API_USER = "http://localhost:3000/api/user";

  const API_USER = import.meta.env.VITE_BACKEND_URL;



const MainProvider = ({ children }) => {

  // ✅ Signup
  const signup = async (userData) => {
    try {
      const res = await axios.post(`${API_USER}/api/user/register`, userData);
      console.log("User Added:", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Login
  const login = async (userData) => {
    try {
      console.log(userData, "===userData");

      const res = await axios.post(`${API_USER}/api/user/login`, userData);
      console.log("Login Success:", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainContext.Provider value={{ signup, login }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;