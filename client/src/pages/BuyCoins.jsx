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


const formData=new FormData();

formData.append(
"username",
user.username
);

formData.append(
"packageName",
selected
);

formData.append(
"amount",
amount
);

formData.append(
"screenshot",
screenshot
);



try{


const res=await axios.post(
`${API}/coins/request`,
formData,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
);


alert(res.data.message);

setSelected("");
setAmount("");
setScreenshot(null);



}catch(err){

console.log(err);
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
borderRadius:"25px"
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

background:
selected===p.name
?
"#111"
:
"white",

color:
selected===p.name
?
"white"
:
"black",

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


<h2>
Pay Using UPI
</h2>


<h3>
UPI ID
</h3>


<div style={{

background:"white",
color:"black",
padding:"15px",
borderRadius:"15px",
fontWeight:"bold",
fontSize:"20px"

}}>

shivansh225@ptyes

</div>



<p>
After Payment Upload Screenshot
</p>


<input

type="file"

accept="image/*"

onChange={(e)=>
setScreenshot(e.target.files[0])
}

/>


<br/><br/>


<button

onClick={submitRequest}

style={{

padding:"15px 40px",
borderRadius:"25px",
border:"none",
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
fontWeight:"bold"

}}>

⬅ Back Home

</button>

</Link>


</div>

);


}
