import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://venom-server-5dey.onrender.com";

export default function Admin() {

  const [proofs, setProofs] = useState([]);

  useEffect(() => {
    loadProofs();
  }, []);


  async function loadProofs() {

    try {

      const res = await axios.get(
        `${API}/admin/proofs`
      );

      if(res.data.success){
        setProofs(res.data.proofs);
      }

    } catch(err){

      console.log(err);
      alert("Server Error");

    }

  }


  async function approve(proofId){

    try{

      const res = await axios.post(
        `${API}/admin/approve`,
        {proofId}
      );

      alert(res.data.message);
      loadProofs();

    }catch(err){

      console.log(err);
      alert("Server Error");

    }

  }



  async function reject(proofId){

    try{

      const res = await axios.post(
        `${API}/admin/reject`,
        {proofId}
      );

      alert(res.data.message);
      loadProofs();

    }catch(err){

      console.log(err);
      alert("Server Error");

    }

  }



  return (

    <div
      style={{
        minHeight:"100vh",
        padding:"25px",
        background:"linear-gradient(135deg,#141e30,#243b55)",
        fontFamily:"Arial"
      }}
    >


      <h1
        style={{
          color:"white",
          textAlign:"center"
        }}
      >
        🔐 Admin Panel
      </h1>



      {
        proofs.length===0 ? (

          <h3
            style={{
              color:"white",
              textAlign:"center"
            }}
          >
            No Pending Proof
          </h3>


        ) : (


          proofs.map((p)=>(


            <div
              key={p.id}
              style={card}
            >


              <h2>
                👤 {p.username}
              </h2>


              <p>
                Campaign ID : {p.campaignId}
              </p>


              <p>
                Status : {p.status}
              </p>


              <p>
                ⭐ Trust Score : {p.trustScore}
              </p>



              <img
                src={`${API}/uploads/${p.screenshot}`}
                alt=""
                style={{
                  width:"100%",
                  borderRadius:"20px"
                }}
              />



              <div
                style={{
                  display:"flex",
                  gap:"10px",
                  marginTop:"20px"
                }}
              >


                <button
                  style={approveBtn}
                  onClick={()=>approve(p.id)}
                >
                  ✅ Approve
                </button>



                <button
                  style={rejectBtn}
                  onClick={()=>reject(p.id)}
                >
                  ❌ Reject
                </button>


              </div>


            </div>


          ))


        )
      }



    </div>

  );

}



const card={

 background:"rgba(255,255,255,0.12)",
 backdropFilter:"blur(12px)",
 borderRadius:"25px",
 padding:"20px",
 marginBottom:"20px",
 color:"white"

};


const approveBtn={

 flex:1,
 padding:"14px",
 borderRadius:"20px",
 border:"none",
 background:"#00c853",
 color:"white",
 fontWeight:"bold"

};


const rejectBtn={

 flex:1,
 padding:"14px",
 borderRadius:"20px",
 border:"none",
 background:"#d50000",
 color:"white",
 fontWeight:"bold"

};
