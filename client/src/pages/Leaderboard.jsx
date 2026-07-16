import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://venom-server-5dey.onrender.com";

export default function Leaderboard() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);


  async function loadLeaderboard() {

    try {

      const res = await axios.get(
        `${API}/leaderboard`
      );

      if(res.data.success){
        setUsers(res.data.leaderboard);
      }

    } catch(err){

      console.log(err);
      alert("Server Error");

    }

  }


  return (

    <div
      style={{
        minHeight:"100vh",
        padding:"25px",
        background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
        fontFamily:"Arial"
      }}
    >


      <h1
        style={{
          textAlign:"center",
          color:"white"
        }}
      >
        🏆 Leaderboard
      </h1>



      {
        users.map((user,index)=>(

          <div
            key={user.id}
            style={card}
          >

            <h2>
              {index===0 ? "🥇" :
               index===1 ? "🥈" :
               index===2 ? "🥉" :
               "🏅"}
              {" "}
              {user.username}
            </h2>


            <h3>
              🪙 {user.coins} Coins
            </h3>


          </div>

        ))
      }



      <Link to="/home">

        <button style={button}>
          ⬅ Back Home
        </button>

      </Link>


    </div>

  );

}



const card={

 background:"rgba(255,255,255,0.18)",
 backdropFilter:"blur(12px)",
 borderRadius:"25px",
 padding:"20px",
 marginBottom:"15px",
 color:"white"

};


const button={

 width:"100%",
 marginTop:"20px",
 padding:"16px",
 borderRadius:"25px",
 border:"none",
 background:"white",
 color:"#833ab4",
 fontWeight:"bold",
 fontSize:"18px"

};
