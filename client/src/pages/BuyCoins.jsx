import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API="https://venom-server-5dey.onrender.com";


export default function BuyCoins(){

const user=JSON.parse(
localStorage.getItem("venomUser")
);


const [selected,setSelected]=useState("");
const [amount,setAmount]=useState("");
const [screenshot,setScreenshot]=useState(null);
const [loading,setLoading]=useState(false);



const packages=[
{name:"50 Coins",price:20},
{name:"180 Coins",price:50},
{name:"400 Coins",price:100}
];





async function submitRequest(){


if(loading){
return;
}



if(!selected){

alert("Select Package");
return;

}



if(!screenshot){

alert("Upload Payment Screenshot");
return;

}



if(!user){

alert("Login Required");
return;

}



setLoading(true);



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



setLoading(false);


}





return(


<div style={page}>


<h1 style={{textAlign:"center"}}>
💎 Buy Coins
</h1>



<div style={box}>


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

...packageBtn,

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
"black"

}}

>

🪙 {p.name} — ₹{p.price}

</button>


))


}



</div>




<div style={box}>


<h2>
Pay Using UPI
</h2>


<h3>
shivansh225@ptyes
</h3>


<p>
Payment ke baad screenshot upload karo
</p>



<input

type="file"

accept="image/*"

onChange={(e)=>
setScreenshot(
e.target.files[0]
)
}

/>



<br/><br/>



<button

disabled={loading}

onClick={submitRequest}

style={submitBtn}

>

{

loading
?
"Submitting..."
:
"Submit Payment"

}


</button>



</div>




<Link to="/home">

<button style={backBtn}>

⬅ Back Home

</button>

</Link>



</div>


);


}





const page={

minHeight:"100vh",
padding:"20px",
background:
"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
color:"white",
fontFamily:"Arial"

};



const box={

background:"rgba(255,255,255,.15)",
padding:"20px",
borderRadius:"25px",
marginBottom:"20px"

};



const packageBtn={

width:"100%",
padding:"16px",
marginTop:"12px",
borderRadius:"20px",
border:"none",
fontSize:"18px",
fontWeight:"bold"

};



const submitBtn={

padding:"15px 40px",
borderRadius:"25px",
border:"none",
fontSize:"18px",
fontWeight:"bold"

};



const backBtn={

width:"100%",
padding:"16px",
borderRadius:"20px",
border:"none",
fontWeight:"bold"

};
