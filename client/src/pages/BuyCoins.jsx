import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API="https://venom-server-5dey.onrender.com";

export default function BuyCoins(){

const user=JSON.parse(localStorage.getItem("venomUser"));

const [selected,setSelected]=useState("");
const [amount,setAmount]=useState("");
const [screenshot,setScreenshot]=useState(null);

const packages=[
{name:"50 Coins",price:30},
{name:"100 Coins",price:50},
{name:"320 Coins",price:150}
];

async function submitRequest(){

if(!selected){
alert("Select Package");
return;
}

if(!screenshot){
alert("Upload Payment Screenshot");
return;
}

const data={
username:user.username,
packageName:selected,
amount,
screenshot:screenshot.name
};

try{

const res=await axios.post(`${API}/coins/request`,data);

alert(res.data.message);

setSelected("");
setAmount("");
setScreenshot(null);

}catch(err){

alert("Server Error");

}

}

return(

<div style={{
minHeight:"100vh",
padding:"20px",
background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
fontFamily:"Arial",
color:"white"
}}>

<h1 style={{textAlign:"center"}}>
💎 Buy Coins
</h1>

<div style={{
background:"rgba(255,255,255,.15)",
padding:"20px",
borderRadius:"25px",
backdropFilter:"blur(10px)"
}}>

<h2>Select Package</h2>

{
packages.map((p)=>(

<button
key={p.name}
onClick={()=>{
setSelected(p.name);
setAmount(p.price);
}}
style={{
width:"100%",
padding:"16px",
marginTop:"12px",
borderRadius:"20px",
border:"none",
fontSize:"18px",
fontWeight:"bold"
}}
>

🪙 {p.name} — ₹{p.price}

</button>

))
}

</div>

<div style={{
marginTop:"25px",
background:"rgba(255,255,255,.15)",
padding:"20px",
borderRadius:"25px",
textAlign:"center"
}}>

<h2>Pay Here</h2>

<img
src="/qr.png"
style={{
width:"230px",
borderRadius:"20px",
background:"white",
padding:"10px"
}}
alt=""
/>

<h3 style={{marginTop:"15px"}}>
UPI ID
</h3>

<div style={{
background:"white",
color:"black",
padding:"12px",
borderRadius:"15px",
fontWeight:"bold"
}}>
shivansh225@ptyes
</div>

<p style={{marginTop:"15px"}}>
After Payment Upload Screenshot
</p>

<input
type="file"
accept="image/*"
onChange={(e)=>setScreenshot(e.target.files[0])}
/>

<br/><br/>

<button
onClick={submitRequest}
style={{
padding:"15px 40px",
border:"none",
borderRadius:"25px",
fontSize:"18px",
fontWeight:"bold"
}}
>

Submit Payment

</button>

</div>

<Link to="/home">

<button style={{
marginTop:"25px",
width:"100%",
padding:"16px",
borderRadius:"20px",
border:"none",
fontSize:"18px",
fontWeight:"bold"
}}>

⬅ Back Home

</button>

</Link>

</div>

);

}
