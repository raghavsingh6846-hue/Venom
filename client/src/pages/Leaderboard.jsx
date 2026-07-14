import { Link } from "react-router-dom";

export default function Leaderboard() {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Leaderboard</h1>

      <ol style={{ display: "inline-block", textAlign: "left" }}>
        <li>rajveer - 100 Coins</li>
        <li>user2 - 80 Coins</li>
        <li>user3 - 50 Coins</li>
      </ol>

      <br /><br />

      <Link to="/home">
        <button>Back Home</button>
      </Link>
    </div>
  );
}
