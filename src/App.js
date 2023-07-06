import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './App.css';
import SharedLayout from "./components/SharedLayout";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Login from './components/Login';
import Posting from './components/Posting';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Social from './components/Social';



export const UserContext = createContext();
//Reminding myself the paths below are solely
//for FE URL bar only, no link to BE
//Also, <Navbar /> cannot be outside of <BrowserRouter>, 
//we can use nested routes to put <Navbar/> inside each route

const App = () => {

  const [user, setUser] = useState("Daniel");

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<SharedLayout />} >

              {/* <Route path="/signup" element={<SignUp />} /> */}
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posting" element={<Posting />} />
              <Route path="/social" element={<Social />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
