import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "https://venom-server-5dey.onrender.com";

export default function Wallet() {

  const loginUser = JSON.parse(
    localStorage.getItem("venomUser")
  );


  const [user,setUser]=useState({

    username:"",
    coins:0,
    followers:0,
    likes:0

  });



  async function loadWallet(){

    try{

      const res = await axios.post(
        `${API}/auth/login`,
        {
          username:loginUser.username
        }
      );


      if(res.data.success){

        setUser(res.data.user);


        localStorage.setItem(
          "venomUser",
          JSON.stringify(res.data.user)
        );

      }


    }
    catch(err){

      console.log(err);
      alert("Server Error");

    }

  }



  useEffect(()=>{

    loadWallet();

  },[]);



  return(

    <div
    style={{
      minHeight:"100vh",
      padding:"25px",
      background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
      color:"white",
      fontFamily:"Arial",
      textAlign:"center"
    }}
    >


      <Link to="/home">

        <button style={backBtn}>
          ⬅️ Back Home
        </button>

      </Link>



      <h1>
        🪙 Venom Wallet
      </h1>



      <div
      style={{
        marginTop:"30px",
        padding:"30px",
        borderRadius:"30px",
        background:"rgba(255,255,255,0.18)",
        backdropFilter:"blur(12px)"
      }}
      >


        <h2>
          👤 {user.username}
        </h2>


        <h1
        style={{
          fontSize:"50px",
          margin:"20px 0"
        }}
        >
          🪙 {user.coins}
        </h1>


        <p>
          Total Coins
        </p>


      </div>



      <div
      style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gap:"15px",
        marginTop:"25px"
      }}
      >


        <div style={card}>
          ❤️
          <h2>{user.followers}</h2>
          Followers
        </div>


        <div style={card}>
          👍
          <h2>{user.likes}</h2>
          Likes
        </div>


      </div>



      <button
      onClick={loadWallet}
      style={btn}
      >

        🔄 Refresh Wallet

      </button>



    </div>

  );

}



const btn={

  marginTop:"30px",
  width:"100%",
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
  background:"rgba(255,255,255,0.9)",
  color:"#833ab4",
  fontSize:"17px",
  fontWeight:"bold"

};



const card={

  padding:"20px",
  borderRadius:"25px",
  background:"rgba(255,255,255,0.18)",
  backdropFilter:"blur(10px)",
  fontSize:"18px"

};
