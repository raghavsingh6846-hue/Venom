import { useEffect, useState } from "react";
import axios from "axios";

export default function Wallet() {

  const [user, setUser] = useState({
    username: "",
    coins: 0,
    followers: 0,
    likes: 0
  });

  useEffect(() => {

    async function loadWallet() {

      try {

        const res = await axios.post(
          "http://127.0.0.1:3000/auth/login",
          {
            username: "Raj123"
          }
        );

        if (res.data.success) {
          setUser(res.data.user);
        }

      } catch (err) {
        alert("Server Error");
      }

    }

    loadWallet();

  }, []);

  return (

    <div style={{ padding: 30, textAlign: "center" }}>

      <h1>Wallet</h1>

      <h2>{user.username}</h2>

      <h3>🪙 Coins : {user.coins}</h3>

      <h3>❤️ Followers : {user.followers}</h3>

      <h3>👍 Likes : {user.likes}</h3>

    </div>

  );

}
