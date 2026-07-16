import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Campaign from "./pages/Campaign";
import Leaderboard from "./pages/Leaderboard";
import Tasks from "./pages/Tasks";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import BuyCoins from "./pages/BuyCoins";

function Start() {

  const [loading,setLoading]=useState(true);
  const [user,setUser]=useState(null);

  useEffect(()=>{

    async function checkUser(){

      const data=await Preferences.get({
        key:"venomUser"
      });

      if(data.value){
        setUser(JSON.parse(data.value));
      }

      setLoading(false);

    }

    checkUser();

  },[]);

  if(loading){

    return(
      <div style={{
        textAlign:"center",
        marginTop:"100px",
        fontSize:"25px"
      }}>
        Loading Venom 🐍...
      </div>
    );

  }

  const isAdmin =
    localStorage.getItem("venomAdmin")==="true";

  return(

    <Routes>

      <Route
        path="/"
        element={
          user
          ? <Navigate to="/home"/>
          : <Login/>
        }
      />

      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/wallet" element={<Wallet/>}/>
      <Route path="/tasks" element={<Tasks/>}/>
      <Route path="/campaign" element={<Campaign/>}/>
      <Route path="/leaderboard" element={<Leaderboard/>}/>
      <Route path="/buycoins" element={<BuyCoins/>}/>

      <Route
        path="/admin-login"
        element={<AdminLogin/>}
      />

      <Route
        path="/admin"
        element={
          isAdmin
          ? <Admin/>
          : <Navigate to="/admin-login"/>
        }
      />

    </Routes>

  );

}

export default function App(){

  return(

    <BrowserRouter>
      <Start/>
    </BrowserRouter>

  );

}
