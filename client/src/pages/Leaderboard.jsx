import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Leaderboard() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {

    try {

      const res = await axios.get(
        "http://127.0.0.1:3000/leaderboard"
      );

      if (res.data.success) {
        setUsers(res.data.leaderboard);
      }

    } catch {

      alert("Server Error");

    }

  }

  return (

    <div style={{ padding:30, textAlign:"center" }}>

      <h1>Leaderboard</h1>

      <ol style={{ display:"inline-block", textAlign:"left" }}>

        {users.map((user) => (

          <li key={user.id}>
            {user.username} - {user.coins} Coins
          </li>

        ))}

      </ol>

      <br /><br />

      <Link to="/home">
        <button>Back Home</button>
      </Link>

    </div>

  );

}
