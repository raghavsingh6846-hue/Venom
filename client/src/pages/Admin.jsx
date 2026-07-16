import { useEffect,useState } from "react";
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

const res=await axios.get(`${API}/admin/proofs`);

if(res.data.success){
setProofs(res.data.proofs);
}

}catch{}

}

async function loadRequests(){

try{

const res=await axios.get(`${API}/coins/requests`);

if(res.data.success){
setRequests(res.data.requests);
}

}catch{}

}

async function approveProof(id){

await axios.post(`${API}/admin/approve`,{
proofId:id
});

loadProofs();

}

async function rejectProof(id){

await axios.post(`${API}/admin/reject`,{
proofId:id
});

loadProofs();

}

async function approveCoin(id){

await axios.post(`${API}/coins/approve`,{
id
});

alert("Coins Added");

loadRequests();

}

async function rejectCoin(id){

await axios.post(`${API}/coins/reject`,{
id
});

alert("Rejected");

loadRequests();

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

<h2>📸 Pending Proofs</h2>

{
proofs.map(p=>(

<div key={p.id} style={{
background:"#222",
padding:"15px",
marginBottom:"15px",
borderRadius:"15px"
}}>

<h3>{p.username}</h3>

<img
src={`${API}/uploads/${p.screenshot}`}
style={{width:"100%",borderRadius:"10px"}}
alt=""
/>

<button onClick={()=>approveProof(p.id)}>
✅ Approve
</button>

<button
style={{marginLeft:"10px"}}
onClick={()=>rejectProof(p.id)}
>
❌ Reject
</button>

</div>

))
}

<h2 style={{marginTop:"35px"}}>
💰 Coin Payment Requests
</h2>

{
requests.map(r=>(

<div key={r.id} style={{
background:"#222",
padding:"15px",
marginBottom:"15px",
borderRadius:"15px"
}}>

<h3>{r.username}</h3>

<p>Package : {r.packageName}</p>

<p>Amount : ₹{r.amount}</p>

<p>Status : {r.status}</p>

<p>Screenshot : {r.screenshot}</p>

<button
onClick={()=>approveCoin(r.id)}
>

✅ Approve Payment

</button>

<button
style={{marginLeft:"10px"}}
onClick={()=>rejectCoin(r.id)}
>

❌ Reject

</button>

</div>

))
}

<Link to="/home">

<button style={{
width:"100%",
padding:"16px",
marginTop:"30px",
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
