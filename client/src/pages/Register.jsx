import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div style={{padding:"30px",textAlign:"center"}}>
      <h1>Register</h1>

      <input
        placeholder="Username"
        style={{width:"250px",padding:"10px",margin:"10px"}}
      />

      <br />

      <button style={{padding:"10px 30px"}}>
        Register
      </button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
