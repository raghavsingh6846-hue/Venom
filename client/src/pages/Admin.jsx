import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API="https://venom-server-5dey.onrender.com";


export default function Admin(){

const [proofs,setProofs]=useState([]);
const [requests,setRequests]=useState([]);



useEffect(()=>{

loadProofs();
loadRequests();

},[]);



async function loadProofs(){

try{

const res=await axios.get(
`${API}/admin/proofs`
);

if(res.data.success){

setProofs(res.data.proofs);

}

}catch(err){

console.log(err);

}

}




async function loadRequests(){

try{

const res=await axios.get(
`${API}/coins/requests`
);

if(res.data.success){

setRequests(res.data.requests);

}

}catch(err){

console.log(err);

}

}




async function approveCoin(id){

try{

const res=await axios.post(
`${API}/coins/approve`,
{id}
);


alert(res.data.message);

loadRequests();


}catch(err){

alert("Server Error");

}

}




async function rejectCoin(id){

try{

const res=await axios.post(
`${API}/coins/reject`,
{id}
);


alert(res.data.message);

loadRequests();


}catch(err){

alert("Server Error");

}

}





return(

<div style={{
minHeight:"100vh",
padding:"20px",
background:"#111",
color:"white",
fontFamily:"Arial"
}}>


<h1 style={{textAlign:"center"}}>
🔐 Admin Panel
</h1>



<h2>
💰 Coin Payment Requests
</h2>



{

requests.map((r)=>(


<div
key={r.id}
style={{
background:"#222",
padding:"20px",
marginBottom:"20px",
borderRadius:"20px"
}}
>


<h3>
👤 {r.username}
</h3>


<p>
Package : {r.packageName}
</p>


<p>
Amount : ₹{r.amount}
</p>


<p>
Status : {r.status}
</p>



{
r.screenshot && (

<img

src={`${API}/uploads/${r.screenshot}`}

alt="Payment Proof"

style={{

width:"100%",
borderRadius:"15px",
marginTop:"15px"

}}

/>

)

}



<div style={{
display:"flex",
gap:"10px",
marginTop:"15px"
}}>


<button

onClick={()=>approveCoin(r.id)}

style={approveBtn}

>

✅ Approve

</button>



<button

onClick={()=>rejectCoin(r.id)}

style={rejectBtn}

>

❌ Reject

</button>



</div>



</div>


))

}




<Link to="/home">

<button style={backBtn}>
⬅ Back Home
</button>

</Link>



</div>

);

}





const approveBtn={

flex:1,
padding:"15px",
borderRadius:"20px",
border:"none",
background:"#00c853",
color:"white",
fontWeight:"bold"

};



const rejectBtn={

flex:1,
padding:"15px",
borderRadius:"20px",
border:"none",
background:"#d50000",
color:"white",
fontWeight:"bold"

};



const backBtn={

width:"100%",
padding:"16px",
marginTop:"25px",
borderRadius:"20px",
border:"none",
fontWeight:"bold"

};
