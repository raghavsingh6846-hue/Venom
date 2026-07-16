import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://venom-server-5dey.onrender.com";

export default function Campaign() {

  const loginUser = JSON.parse(
    localStorage.getItem("venomUser")
  );


  const [type,setType]=useState("Follow");
  const [link,setLink]=useState("");
  const [quantity,setQuantity]=useState("");
  const [commentText,setCommentText]=useState("");



  async function createCampaign(){

    try{


      const res = await axios.post(
        `${API}/campaign/create`,
        {
          username:loginUser.username,
          type,
          link,
          quantity,
          commentText
        }
      );


      if(res.data.success){

        alert("Campaign Created 🚀");

        setType("Follow");
        setLink("");
        setQuantity("");
        setCommentText("");

      }
      else{

        alert(res.data.message);

      }


    }
    catch(err){

      console.log(err);
      alert("Server Error");

    }

  }



  return(

    <div
    style={{
      minHeight:"100vh",
      padding:"25px",
      background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
      fontFamily:"Arial"
    }}
    >


      <Link to="/home">

        <button style={backBtn}>
          ⬅️ Back Home
        </button>

      </Link>



      <div style={box}>


        <h1 style={{color:"white"}}>
          📢 Create Campaign
        </h1>


        <p style={{color:"white"}}>
          Grow your Instagram account
        </p>



        <select
        value={type}
        onChange={(e)=>setType(e.target.value)}
        style={input}
        >

          <option>Follow</option>
          <option>Like</option>
          <option>Comment</option>

        </select>



        <input
        placeholder="Instagram Link"
        value={link}
        onChange={(e)=>setLink(e.target.value)}
        style={input}
        />



        <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e)=>setQuantity(e.target.value)}
        style={input}
        />



        {
          type==="Comment" && (

            <textarea
            placeholder="Comment Text"
            value={commentText}
            onChange={(e)=>setCommentText(e.target.value)}
            style={input}
            />

          )
        }



        <button
        onClick={createCampaign}
        style={button}
        >

          🚀 Create Order

        </button>



      </div>


    </div>

  );

}




const box={

 maxWidth:"400px",
 margin:"auto",
 padding:"30px",
 borderRadius:"30px",
 background:"rgba(255,255,255,0.18)",
 backdropFilter:"blur(12px)",
 textAlign:"center"

};



const input={

 width:"90%",
 padding:"15px",
 marginTop:"15px",
 borderRadius:"15px",
 border:"none",
 fontSize:"16px",
 outline:"none"

};



const button={

 width:"100%",
 marginTop:"25px",
 padding:"16px",
 borderRadius:"25px",
 border:"none",
 background:"white",
 color:"#833ab4",
 fontSize:"18px",
 fontWeight:"bold"

};



const backBtn={

 width:"100%",
 padding:"14px",
 borderRadius:"20px",
 border:"none",
 background:"white",
 color:"#833ab4",
 fontWeight:"bold",
 fontSize:"17px",
 marginBottom:"20px"

};
