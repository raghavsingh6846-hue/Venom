import { useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";

const API = "https://venom-server-5dey.onrender.com";


export default function MyOrders(){

const [orders,setOrders]=useState([]);
const [loading,setLoading]=useState(true);


useEffect(()=>{
loadOrders();
},[]);



async function loadOrders(){

try{

const data = await Preferences.get({
key:"venomUser"
});


if(!data.value){
setLoading(false);
return;
}


const user = JSON.parse(data.value);



const res = await fetch(
`${API}/orders/my/${user.username}`
);



const result = await res.json();



if(result.success){

setOrders(result.orders || []);

}



}catch(err){

console.log(err);

}


setLoading(false);

}




return(

<div style={page}>


<h1>
📦 My Orders
</h1>



<button
style={button}
onClick={loadOrders}
>
🔄 Refresh
</button>



{

loading ?

<h3>
Loading...
</h3>


:


orders.length===0 ?

<h3>
No Orders Found
</h3>


:


orders.map(order=>(


<div
key={order.id}
style={card}
>


<h2>
{order.title || "Campaign"}
</h2>


<p>
Type : {order.type}
</p>


<p>
Reward : 🪙 {order.reward}
</p>


<p>
Total Quantity : {order.quantity}
</p>


<p>
Completed : {order.completed}
</p>


<p>
Remaining : {order.remaining}
</p>



<div style={progressBox}>

<div
style={{
...progress,
width:
order.quantity
?
`${Math.min(
100,
(order.completed/order.quantity)*100
)}%`
:
"0%"
}}
>

</div>

</div>



<p>
Status : {order.status}
</p>



</div>


))


}



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



const card={

background:"white",
color:"#222",
padding:"20px",
borderRadius:"20px",
marginTop:"15px"

};



const button={

padding:"12px 20px",
border:"none",
borderRadius:"20px",
fontWeight:"bold"

};



const progressBox={

height:"12px",
background:"#ddd",
borderRadius:"20px",
overflow:"hidden"

};



const progress={

height:"100%",
background:"#833ab4"

};
