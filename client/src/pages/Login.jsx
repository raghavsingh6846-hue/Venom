import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";

const API = "https://venom-server-5dey.onrender.com";

export default function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);


  async function login() {

    if(!username.trim()){
      alert("Enter Username");
      return;
    }


    try {

      setLoading(true);


      const res = await axios.post(
        `${API}/auth/login`,
        { username }
      );


      if(res.data.success){


        await Preferences.set({
          key:"venomUser",
          value:JSON.stringify(res.data.user)
        });


        localStorage.setItem(
          "venomUser",
          JSON.stringify(res.data.user)
        );


        navigate("/home");


      }else{


        alert(res.data.message);


      }


    }catch(err){


      console.log(err);

      alert("Cannot connect to server");


    }finally{


      setLoading(false);


    }

  }


  return (

    <div
      style={{
        minHeight:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
        fontFamily:"Arial"
      }}
    >


      <div
        style={{
          width:"320px",
          padding:"35px",
          borderRadius:"30px",
          background:"rgba(255,255,255,0.18)",
          backdropFilter:"blur(12px)",
          textAlign:"center",
          color:"white"
        }}
      >


        <h1 style={{fontSize:"42px"}}>
          Venom 🐍
        </h1>


        <p>
          Social Task Platform
        </p>



        <input
          placeholder="Enter Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          style={{
            width:"90%",
            padding:"15px",
            borderRadius:"15px",
            border:"none",
            marginTop:"20px",
            fontSize:"16px"
          }}
        />



        <button
          onClick={login}
          disabled={loading}
          style={{
            width:"100%",
            marginTop:"20px",
            padding:"15px",
            borderRadius:"20px",
            border:"none",
            background:"white",
            color:"#833ab4",
            fontSize:"18px",
            fontWeight:"bold",
            opacity:loading?0.7:1
          }}
        >

          {
            loading 
            ? "⏳ Logging in..."
            : "Login 🚀"
          }

        </button>



        <p>
          New user?
        </p>



        <Link to="/register">

          <button
            style={{
              width:"100%",
              padding:"12px",
              borderRadius:"20px",
              border:"1px solid white",
              background:"transparent",
              color:"white"
            }}
          >
            Create Account
          </button>

        </Link>



      </div>


    </div>

  );

}
