import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:3000/wallet", {
        username: "rajveer",
      })
      .then((res) => {
        if (res.data.success) {
          setCoins(res.data.coins);
        }
      });
  }, []);

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Venom Home</h1>

      <h3>Welcome Rajveer</h3>

      <h2>🪙 Coins : {coins}</h2>

      <br />

      <Link to="/wallet">
        <button>Wallet</button>
      </Link>

      <br /><br />

      <Link to="/campaign">
        <button>Campaign</button>
      </Link>

      <br /><br />

      <Link to="/leaderboard">
        <button>Leaderboard</button>
      </Link>
    </div>
  );
}
