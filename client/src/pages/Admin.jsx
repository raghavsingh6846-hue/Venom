import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API="https://venom-server-5dey.onrender.com";


export default function Admin(){

const [users,setUsers]=useState([]);
const [requests,setRequests]=useState([]);
const [proofs,setProofs]=useState([]);
const [campaigns,setCampaigns]=useState([]);



useEffect(()=>{

loadUsers();
loadPayments();
loadProofs();
loadCampaigns();

},[]);





async function loadUsers(){

try{

const res=await axios.get(
`${API}/admin/users`
);

if(res.data.success){

setUsers(res.data.users);

}

}catch(err){

console.log(err);

}

}





async function loadPayments(){

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






async function loadProofs(){

try{

const res=await axios.get(
`${API}/proof/pending`
);

if(res.data.success){

setProofs(res.data.proofs);

}

}catch(err){

console.log(err);

}

}







async function loadCampaigns(){

try{

const res=await axios.get(
`${API}/campaign/admin/all`
);

if(res.data.success){

setCampaigns(res.data.campaigns);

}

}catch(err){

console.log(err);

}

}






async function blockUser(id){

await axios.post(
`${API}/admin/block`,
{id}
);

loadUsers();

}






async function unblockUser(id){

await axios.post(
`${API}/admin/unblock`,
{id}
);

loadUsers();

}async function approvePayment(id){

try{

const res=await axios.post(
`${API}/coins/approve`,
{id}
);

alert(res.data.message);

loadPayments();

}catch{

alert("Server Error");

}

}





async function rejectPayment(id){

try{

const res=await axios.post(
`${API}/coins/reject`,
{id}
);

alert(res.data.message);

loadPayments();

}catch{

alert("Server Error");

}

}





async function approveProof(id){

try{

const res=await axios.post(
`${API}/proof/approve`,
{id}
);

alert(res.data.message);

loadProofs();

}catch{

alert("Server Error");

}

}





async function rejectProof(id){

try{

const res=await axios.post(
`${API}/proof/reject`,
{id}
);

alert(res.data.message);

loadProofs();

}catch{

alert("Server Error");

}

}





async function deleteCampaign(id){

try{

const res=await axios.post(
`${API}/campaign/admin/delete`,
{id}
);

alert(res.data.message);

loadCampaigns();

}catch{

alert("Server Error");

}

}return (

<div style={{
minHeight:"100vh",
padding:"20px",
background:"#111",
color:"white",
fontFamily:"Arial"
}}>

<h1 style={{textAlign:"center"}}>
🔐 Venom Admin Panel
</h1>


<h2>👥 Users</h2>


{
users.map(u=>(

<div style={card} key={u.id}>

<h3>{u.username}</h3>

<p>🪙 Coins : {u.coins}</p>

<p>⭐ Trust : {u.trustScore}</p>

<p>📋 Tasks : {u.tasksCompleted}</p>

<p>Status : {u.status}</p>


{
u.status==="blocked"

?

<button
style={green}
onClick={()=>unblockUser(u.id)}
>
✅ Unblock
</button>

:

<button
style={red}
onClick={()=>blockUser(u.id)}
>
🚫 Block
</button>

}


</div>

))

}




<h2>💳 Payment Requests</h2>


{
requests.map(r=>(

<div style={card} key={r.id}>

<h3>{r.username}</h3>

<p>{r.packageName}</p>

<p>₹{r.amount}</p>


<img

src={`${API}/uploads/${r.screenshot}`}

style={img}

/>


<button
style={green}
onClick={()=>approvePayment(r.id)}
>
✅ Approve
</button>


<button
style={red}
onClick={()=>rejectPayment(r.id)}
>
❌ Reject
</button>


</div>

))

}




<h2>📸 Task Proof Requests</h2>


{
proofs.map(p=>(

<div style={card} key={p.id}>


<h3>{p.username}</h3>

<p>{p.type}</p>

<p>Reward : {p.reward}</p>


<img

src={`${API}/uploads/${p.screenshot}`}

style={img}

/>


<button
style={green}
onClick={()=>approveProof(p.id)}
>
✅ Approve
</button>


<button
style={red}
onClick={()=>rejectProof(p.id)}
>
❌ Reject
</button>


</div>


))

}





<h2>📢 Campaigns</h2>


{
campaigns.map(c=>(

<div style={card} key={c.id}>

<h3>{c.title}</h3>

<p>User : {c.username}</p>

<p>{c.type} - {c.reward} Coins</p>


<button

style={red}

onClick={()=>deleteCampaign(c.id)}

>

🗑 Delete Campaign

</button>


</div>

))

}




<Link to="/home">

<button style={back}>

⬅ Back Home

</button>

</Link>


</div>

);

}




const card={

background:"#222",
padding:"20px",
margin:"15px 0",
borderRadius:"20px"

};


const img={

width:"100%",
borderRadius:"15px",
margin:"10px 0"

};


const green={

padding:"12px",
background:"#00c853",
color:"white",
border:"none",
borderRadius:"15px",
margin:"5px"

};


const red={

padding:"12px",
background:"#d50000",
color:"white",
border:"none",
borderRadius:"15px",
margin:"5px"

};


const back={

width:"100%",
padding:"15px",
borderRadius:"20px",
border:"none",
marginTop:"20px"

};
