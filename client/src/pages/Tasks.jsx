import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://venom-server-5dey.onrender.com";


export default function Tasks() {

  const loginUser = JSON.parse(
    localStorage.getItem("venomUser")
  );


  const [campaigns,setCampaigns]=useState([]);
  const [selectedFiles,setSelectedFiles]=useState({});



  useEffect(()=>{

    loadCampaigns();

  },[]);



  async function loadCampaigns(){

    try{

      const res = await axios.get(
        `${API}/tasks`,
        {
          params:{
            username:loginUser.username
          }
        }
      );


      if(res.data.success){

        setCampaigns(res.data.tasks);

      }


    }catch(err){

      console.log(err);
      alert("Server Error");

    }

  }



  async function uploadProof(campaignId){

    const file = selectedFiles[campaignId];


    if(!file){

      alert("Please Select Screenshot");
      return;

    }



    const formData = new FormData();

    formData.append(
      "username",
      loginUser.username
    );

    formData.append(
      "campaignId",
      campaignId
    );

    formData.append(
      "screenshot",
      file
    );



    try{


      const res = await axios.post(

        `${API}/proof/upload`,

        formData,

        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }

      );


      alert(res.data.message);

      loadCampaigns();



    }catch(err){

      console.log(err);
      alert("Upload Failed");

    }

  }



  return(

    <div
    style={{
      minHeight:"100vh",
      padding:"20px",
      background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
      fontFamily:"Arial"
    }}
    >



      <Link to="/home">

        <button style={backBtn}>
          ⬅️ Back Home
        </button>

      </Link>



      <h1
      style={{
        color:"white",
        textAlign:"center"
      }}
      >

        🚀 Available Tasks

      </h1>



      {
        campaigns.length===0 ? (

          <h3
          style={{
            color:"white",
            textAlign:"center"
          }}
          >
            No Task Available
          </h3>


        ):(


          campaigns.map((c)=>(


            <div
            key={c.id}
            style={card}
            >


              <div style={badge}>
                {c.type}
              </div>


              <h2>
                👤 {c.username}
              </h2>


              <h2>
                🪙 {c.reward} Coins
              </h2>


              <p>
                📦 Remaining : {c.quantity}
              </p>



              {
                c.type==="Comment" &&
                <p>
                  💬 {c.commentText}
                </p>
              }



              <a
              href={c.link}
              target="_blank"
              rel="noreferrer"
              >

                <button style={btn}>
                  📱 Open Instagram
                </button>

              </a>



              <input
              style={{marginTop:"20px"}}
              type="file"
              accept="image/*"
              onChange={(e)=>
                setSelectedFiles({
                  ...selectedFiles,
                  [c.id]:e.target.files[0]
                })
              }
              />



              <button
              style={uploadBtn}
              onClick={()=>uploadProof(c.id)}
              >

                📸 Upload Proof

              </button>



            </div>


          ))

        )

      }



    </div>

  );

}




const card={

 background:"rgba(255,255,255,0.18)",
 backdropFilter:"blur(12px)",
 borderRadius:"25px",
 padding:"25px",
 marginBottom:"20px",
 color:"white"

};



const badge={

 display:"inline-block",
 padding:"8px 18px",
 borderRadius:"20px",
 background:"white",
 color:"#833ab4",
 fontWeight:"bold"

};



const btn={

 width:"100%",
 padding:"15px",
 borderRadius:"20px",
 border:"none",
 background:"white",
 color:"#833ab4",
 fontWeight:"bold",
 fontSize:"16px"

};



const uploadBtn={

 width:"100%",
 marginTop:"15px",
 padding:"15px",
 borderRadius:"20px",
 border:"none",
 background:"#833ab4",
 color:"white",
 fontWeight:"bold",
 fontSize:"16px"

};



const backBtn={

 width:"100%",
 padding:"14px",
 borderRadius:"20px",
 border:"none",
 background:"white",
 color:"#833ab4",
 fontWeight:"bold",
 fontSize:"17px"

};
