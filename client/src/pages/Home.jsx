import { Link } from "react-router-dom";

export default function Home() {

  const user = JSON.parse(
    localStorage.getItem("venomUser")
  );

  return (

    <div style={{ padding: 30, textAlign: "center" }}>

      <h1>Venom Home</h1>

      <h2>
        Welcome {user ? user.username : "Guest"}
      </h2>

      <br />

      <Link to="/wallet">
        <button>Wallet</button>
      </Link>

      <br /><br />

      <Link to="/tasks">
        <button>Tasks</button>
      </Link>

      <br /><br />

      <Link to="/campaign">
        <button>Campaign</button>
      </Link>

      <br /><br />

      <Link to="/leaderboard">
        <button>Leaderboard</button>
      </Link>

      <br /><br />

      <button
        onClick={() => {
          localStorage.removeItem("venomUser");
          window.location.href = "/";
        }}
      >
        Logout
      </button>

    </div>

  );

}
