import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API="https://venom-server-5dey.onrender.com";

export default function Register(){

const navigate=useNavigate();

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");

async function register(){

if(!username.trim()){
alert("Enter Username");
return;
}

if(!password){
alert("Enter Password");
return;
}

if(password!==confirmPassword){
alert("Passwords do not match");
return;
}

try{

const res=await axios.post(
`${API}/auth/register`,
{
username,
password
}
);

if(res.data.success){

alert("Registration Successful");

navigate("/login");

}else{

alert(res.data.message);

}

}catch(err){

console.log(err);

alert("Server Error");

}

}

return(

<div
style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
fontFamily:"Arial"
}}
>

<div
style={{
width:"320px",
padding:"35px",
borderRadius:"30px",
background:"rgba(255,255,255,0.18)",
backdropFilter:"blur(12px)",
textAlign:"center",
color:"white"
}}
>

<h1>Join Venom 🐍</h1>

<input
placeholder="Username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
style={input}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={input}
/>

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
style={input}
/>

<button
onClick={register}
style={button}
>

Create Account 🚀

</button>

<p style={{marginTop:"20px"}}>
Already have account?
</p>

<Link to="/login">

<button style={loginBtn}>

Login

</button>

</Link>

<p
style={{
marginTop:"20px",
fontSize:"13px",
opacity:0.8
}}
>
Developed by <b>Venom</b>
</p>

</div>

</div>

);

}

const input={

width:"90%",
padding:"15px",
marginTop:"15px",
borderRadius:"15px",
border:"none",
outline:"none"

};

const button={

width:"100%",
padding:"15px",
marginTop:"20px",
borderRadius:"20px",
border:"none",
fontWeight:"bold",
fontSize:"18px"

};

const loginBtn={

width:"100%",
padding:"12px",
marginTop:"10px",
borderRadius:"20px",
border:"1px solid white",
background:"transparent",
color:"white"

};
