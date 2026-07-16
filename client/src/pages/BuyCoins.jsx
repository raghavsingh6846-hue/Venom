import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://venom-server-5dey.onrender.com";


export default function BuyCoins(){

  const user = JSON.parse(
    localStorage.getItem("venomUser")
  );


  const [selected,setSelected]=useState(null);
  const [screenshot,setScreenshot]=useState(null);



  const packages=[

    {
      name:"50 Coins",
      price:30
    },

    {
      name:"100 Coins",
      price:50
    },

    {
      name:"320 Coins",
      price:150
    }

  ];





  async function submitRequest(){


    if(!selected){

      alert("Select Coin Package");

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
      selected.name
    );


    formData.append(
      "amount",
      selected.price
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


      setSelected(null);

      setScreenshot(null);



    }catch(err){


      console.log(err);

      alert("Server Error");


    }



  }




return(


<div style={page}>


<h1>
💎 Buy Coins
</h1>



<div style={box}>


<h2>
Select Package
</h2>



{

packages.map(p=>(


<button

key={p.name}

onClick={()=>setSelected(p)}

style={{

...button,

background:
selected?.name===p.name
?
"#833ab4"
:
"white",

color:
selected?.name===p.name
?
"white"
:
"#833ab4"

}}

>

🪙 {p.name} - ₹{p.price}


</button>


))

}


</div>





<div style={box}>


<h3>
Pay Using UPI / QR
</h3>


<p>
UPI ID / QR Code will be added here
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

onClick={submitRequest}

style={submit}

>

Submit Payment


</button>



</div>





<Link to="/home">

<button style={back}>
⬅ Back Home
</button>


</Link>




</div>


);


}






const page={

minHeight:"100vh",

padding:"25px",

textAlign:"center",

background:
"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",

color:"white",

fontFamily:"Arial"

};



const box={

background:
"rgba(255,255,255,0.15)",

padding:"25px",

borderRadius:"25px",

marginBottom:"25px"

};



const button={

width:"90%",

padding:"16px",

margin:"10px",

borderRadius:"20px",

border:"none",

fontSize:"18px",

fontWeight:"bold"

};



const submit={

width:"100%",

padding:"16px",

borderRadius:"25px",

border:"none",

background:"white",

color:"#833ab4",

fontSize:"18px",

fontWeight:"bold"

};



const back={

width:"100%",

padding:"16px",

borderRadius:"25px",

border:"none",

fontSize:"18px",

fontWeight:"bold"

};
