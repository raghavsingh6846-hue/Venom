import { Link } from "react-router-dom";

export default function Home() {

  const user = JSON.parse(
    localStorage.getItem("venomUser")
  );

  return (

    <div
      style={{
        minHeight:"100vh",
        padding:"25px",
        textAlign:"center",
        background:"linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
        color:"white",
        fontFamily:"Arial"
      }}
    >

      <h1 style={{
        fontSize:"38px",
        marginBottom:"10px"
      }}>
        Venom 🐍
      </h1>

      <div
        style={{
          background:"rgba(255,255,255,0.15)",
          backdropFilter:"blur(10px)",
          borderRadius:"25px",
          padding:"25px",
          marginBottom:"30px"
        }}
      >

        <h2>
          Welcome 👋
        </h2>

        <h2>
          {user ? user.username : "Guest"}
        </h2>

        <h1>
          🪙 {user ? user.coins : 0}
        </h1>

        <p>
          Your Coins
        </p>

      </div>


      <div style={{display:"grid",gap:"15px"}}>


        <Link to="/tasks">
          <button style={btn}>
            🚀 Available Tasks
          </button>
        </Link>


        <Link to="/wallet">
          <button style={btn}>
            🪙 Wallet
          </button>
        </Link>


        <Link to="/campaign">
          <button style={btn}>
            📢 Create Campaign
          </button>
        </Link>


        <Link to="/leaderboard">
          <button style={btn}>
            🏆 Leaderboard
          </button>
        </Link>


        <button
          style={btn}
          onClick={()=>{
            localStorage.removeItem("venomUser");
            window.location.href="/";
          }}
        >
          🚪 Logout
        </button>


      </div>


    </div>

  );

}


const btn = {

  width:"100%",
  padding:"16px",
  borderRadius:"20px",
  border:"none",
  fontSize:"18px",
  fontWeight:"bold",
  background:"white",
  color:"#833ab4",
  cursor:"pointer"

};
