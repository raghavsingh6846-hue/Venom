import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Preferences } from "@capacitor/preferences";
import axios from "axios";

const API = "https://venom-server-5dey.onrender.com";

export default function Login(){

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  async function login(){

    if(!username.trim()){
      alert("Enter Username");
      return;
    }

    if(!password){
      alert("Enter Password");
      return;
    }

    try{

      const res = await axios.post(
        `${API}/auth/login`,
        {
          username,
          password
        }
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
      alert("Server Error");

    }

  }

  return(

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

        <h1>Venom 🐍</h1>

        <p>Welcome Back</p>

        <input
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={input}
        />

        <button
          onClick={login}
          style={button}
        >
          Login
        </button>

        <Link to="/register">
          <button style={registerBtn}>
            Create Account
          </button>
        </Link>

<p
  style={{
    marginTop:"20px",
    fontSize:"13px",
    opacity:0.8
  }}
>
  Developed by <b>Venom</b>
</p>

      </div>

    </div>

  );

}

const input={

  width:"90%",
  padding:"15px",
  marginTop:"15px",
  borderRadius:"15px",
  border:"none",
  outline:"none"

};

const button={

  width:"100%",
  padding:"15px",
  marginTop:"20px",
  borderRadius:"20px",
  border:"none",
  fontSize:"18px",
  fontWeight:"bold"

};

const registerBtn={

  width:"100%",
  padding:"12px",
  marginTop:"15px",
  borderRadius:"20px",
  border:"1px solid white",
  background:"transparent",
  color:"white"

};
