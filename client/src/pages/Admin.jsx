import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://venom-server-5dey.onrender.com";


export default function Admin(){

  const [proofs,setProofs]=useState([]);
  const [coinRequests,setCoinRequests]=useState([]);



  useEffect(()=>{

    loadProofs();
    loadCoins();

  },[]);




  async function loadProofs(){

    const res=await axios.get(
      `${API}/admin/proofs`
    );

    if(res.data.success){

      setProofs(res.data.proofs);

    }

  }





  async function approve(id){

    const res=await axios.post(
      `${API}/admin/approve`,
      {proofId:id}
    );

    alert(res.data.message);

    loadProofs();

  }




  async function reject(id){

    const res=await axios.post(
      `${API}/admin/reject`,
      {proofId:id}
    );

    alert(res.data.message);

    loadProofs();

  }





  async function loadCoins(){

    const res=await axios.get(
      `${API}/admin/coin-requests`
    );


    if(res.data.success){

      setCoinRequests(
        res.data.requests
      );

    }

  }





  async function coinApprove(id){

    const res=await axios.post(
      `${API}/admin/coin-approve`,
      {id}
    );


    alert(res.data.message);

    loadCoins();

  }





  async function coinReject(id){

    const res=await axios.post(
      `${API}/admin/coin-reject`,
      {id}
    );


    alert(res.data.message);

    loadCoins();

  }





return(

<div style={page}>


<h1 style={{color:"white"}}>
🔐 Admin Panel
</h1>



<h2 style={{color:"white"}}>
📸 Task Proof Requests
</h2>



{
proofs.map(p=>(

<div style={card} key={p.id}>

<h3>
👤 {p.username}
</h3>

<p>
Campaign ID : {p.campaignId}
</p>

<img
src={`${API}/uploads/${p.screenshot}`}
style={img}
/>


<div style={row}>

<button
style={green}
onClick={()=>approve(p.id)}
>
✅ Approve
</button>


<button
style={red}
onClick={()=>reject(p.id)}
>
❌ Reject
</button>


</div>


</div>

))
}




<h2 style={{color:"white"}}>
💰 Coin Payment Requests
</h2>




{
coinRequests.map(c=>(


<div style={card} key={c.id}>


<h3>
👤 {c.username}
</h3>


<p>
💎 {c.packageName}
</p>


<p>
💵 ₹{c.amount}
</p>



<p>
📸 Screenshot : {c.screenshot}
</p>



<div style={row}>


<button
style={green}
onClick={()=>coinApprove(c.id)}
>
✅ Add Coins
</button>



<button
style={red}
onClick={()=>coinReject(c.id)}
>
❌ Reject
</button>



</div>


</div>


))

}




</div>


);


}





const page={

minHeight:"100vh",
padding:"25px",
background:"linear-gradient(135deg,#141e30,#243b55)",
fontFamily:"Arial"

};



const card={

background:"rgba(255,255,255,0.12)",
padding:"20px",
borderRadius:"25px",
marginBottom:"20px",
color:"white"

};



const img={

width:"100%",
borderRadius:"20px"

};



const row={

display:"flex",
gap:"10px",
marginTop:"15px"

};



const green={

flex:1,
padding:"14px",
borderRadius:"20px",
border:"none",
background:"#00c853",
color:"white",
fontWeight:"bold"

};



const red={

flex:1,
padding:"14px",
borderRadius:"20px",
border:"none",
background:"#d50000",
color:"white",
fontWeight:"bold"

};
