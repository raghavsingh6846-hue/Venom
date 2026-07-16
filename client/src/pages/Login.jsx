import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = "https://venom-server-5dey.onrender.com";

export default function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  async function login() {

    try {

      const res = await axios.post(
        `${API}/auth/login`,
        { username }
      );

      if (res.data.success) {

        localStorage.setItem(
          "venomUser",
          JSON.stringify(res.data.user)
        );

        navigate("/home");

      } else {

        alert(res.data.message);

      }

    } catch (err) {

      console.log(err);

      if (err.response) {
        alert(err.response.data.message || "Server Error");
      } else {
        alert("Cannot connect to server");
      }

    }

  }

  return (

    <div style={{ padding:30, textAlign:"center" }}>

      <h1>Venom</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>

      <p>
        <Link to="/register">
          Register
        </Link>
      </p>

    </div>

  );

}
