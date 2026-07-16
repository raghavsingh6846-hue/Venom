import { useEffect, useState } from "react";
import axios from "axios";

export default function Wallet() {

  const loginUser = JSON.parse(localStorage.getItem("venomUser"));

  const [user, setUser] = useState({
    username: "",
    coins: 0,
    followers: 0,
    likes: 0
  });

  async function loadWallet() {

    try {

      const res = await axios.post(
        "http://127.0.0.1:3000/auth/login",
        {
          username: loginUser.username
        }
      );

      if (res.data.success) {

        setUser(res.data.user);

        localStorage.setItem(
          "venomUser",
          JSON.stringify(res.data.user)
        );

      }

    } catch {

      alert("Server Error");

    }

  }

  useEffect(() => {
    loadWallet();
  }, []);

  return (

    <div style={{ padding:30, textAlign:"center" }}>

      <h1>Wallet</h1>

      <h2>{user.username}</h2>

      <h3>🪙 Coins : {user.coins}</h3>

      <h3>❤️ Followers : {user.followers}</h3>

      <h3>👍 Likes : {user.likes}</h3>

      <br />

      <button onClick={loadWallet}>
        Refresh Wallet
      </button>

    </div>

  );

}
