import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  async function login() {
    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/wallet",
        {
          username: username,
        }
      );

      if (res.data.success) {
        navigate("/home");
      } else {
        alert("User Not Found");
      }
    } catch (err) {
      alert("Server Error");
    }
  }

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Venom</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "250px", padding: "10px", margin: "10px" }}
      />

      <br />

      <button onClick={login}>
        Login
      </button>

      <p>
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
