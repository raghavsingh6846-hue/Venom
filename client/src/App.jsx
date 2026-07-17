import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import axios from "axios";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import Leaderboard from "./pages/Leaderboard";
import Tasks from "./pages/Tasks";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import BuyCoins from "./pages/BuyCoins";
import MyOrders from "./pages/MyOrders";


const API="https://venom-server-5dey.onrender.com";

const APP_VERSION="1.0.0";


function Start(){

const [loading,setLoading]=useState(true);
const [user,setUser]=useState(null);
const [updateRequired,setUpdateRequired]=useState(false);
const [apkUrl,setApkUrl]=useState("");



useEffect(()=>{

checkUpdate();

checkUser();

},[]);



async function checkUpdate(){

try{

const res=await axios.get(
`${API}/version`
);


if(
res.data.success &&
res.data.version !== APP_VERSION &&
res.data.forceUpdate
){

setApkUrl(res.data.apkUrl);

setUpdateRequired(true);

}


}catch(err){

console.log(err);

}

}





async function checkUser(){

const data = await Preferences.get({
key:"venomUser"
});


if(data.value){

setUser(
JSON.parse(data.value)
);

}


setLoading(false);

}




if(updateRequired){

return(

<div
style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
textAlign:"center",
background:"#111",
color:"white",
fontFamily:"Arial",
padding:"20px"
}}
>

<div>

<h1>
Venom 🐍
</h1>

<h2>
New Update Available
</h2>

<p>
Please update the app to continue
</p>


<button

onClick={()=>{

window.open(
apkUrl,
"_system"
);

}}

style={{
padding:"15px 30px",
borderRadius:"20px",
border:"none",
fontWeight:"bold"
}}

>

Update Now

</button>


</div>

</div>

);

}





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
?
<Navigate to="/home"/>
:
<Login/>
}
/>


<Route path="/login" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>

<Route path="/home" element={<Home/>}/>

<Route path="/tasks" element={<Tasks/>}/>

<Route path="/orders" element={<MyOrders/>}/>

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
?
<Admin/>
:
<Navigate to="/admin-login"/>
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
