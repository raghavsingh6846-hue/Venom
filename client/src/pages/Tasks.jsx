import { useState } from "react";
import axios from "axios";

export default function Tasks() {

  const [coins, setCoins] = useState(0);

  async function followTask() {

    try {

      const res = await axios.post(
        "http://127.0.0.1:3000/tasks/follow",
        {
          username: "Raj123"
        }
      );

      if (res.data.success) {
        setCoins(res.data.coins);
      }

    } catch {

      alert("Server Error");

    }

  }

  async function likeTask() {

    try {

      const res = await axios.post(
        "http://127.0.0.1:3000/tasks/like",
        {
          username: "Raj123"
        }
      );

      if (res.data.success) {
        setCoins(res.data.coins);
      }

    } catch {

      alert("Server Error");

    }

  }

  return (

    <div style={{ padding: 30, textAlign: "center" }}>

      <h1>Tasks</h1>

      <h2>Coins : {coins}</h2>

      <br />

      <button onClick={followTask}>
        Follow User (+3)
      </button>

      <br /><br />

      <button onClick={likeTask}>
        Like Post (+1)
      </button>

    </div>

  );

}
