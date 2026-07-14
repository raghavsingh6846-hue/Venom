import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Wallet() {

  const [coins, setCoins] = useState(0);

  useEffect(() => {
    axios.post("http://127.0.0.1:3000/wallet", {
      username: "rajveer"
    }).then(res => {
      if (res.data.success) {
        setCoins(res.data.coins);
      }
    });
  }, []);

  return (
    <div style={{padding:"30px",textAlign:"center"}}>

      <h1>Wallet</h1>

      <h2>🪙 {coins} Coins</h2>

      <br/>

      <Link to="/home">
        <button>Back</button>
      </Link>

    </div>
  );
}
