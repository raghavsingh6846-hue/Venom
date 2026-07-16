import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {

    if (
      username === "Shivansh7897" &&
      password === "Shivansh8429@"
    ) {

      localStorage.setItem(
        "venomAdmin",
        "true"
      );

      navigate("/admin");

    } else {

      alert("Invalid Admin Login");

    }

  }

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#141e30,#243b55)",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          width: "90%",
          maxWidth: "400px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          padding: "30px",
          borderRadius: "25px",
          color: "white",
          textAlign: "center"
        }}
      >

        <h1>🔐 Admin Login</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          style={{
            width:"100%",
            padding:"15px",
            marginTop:"20px",
            borderRadius:"15px",
            border:"none"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            width:"100%",
            padding:"15px",
            marginTop:"15px",
            borderRadius:"15px",
            border:"none"
          }}
        />

        <button
          onClick={login}
          style={{
            width:"100%",
            padding:"16px",
            marginTop:"20px",
            borderRadius:"20px",
            border:"none",
            fontSize:"18px",
            fontWeight:"bold"
          }}
        >
          Login
        </button>

      </div>

    </div>

  );

}
