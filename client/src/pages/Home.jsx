import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";

const API = "https://venom-server-5dey.onrender.com";

export default function Home() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {

    const data = await Preferences.get({
      key: "venomUser"
    });

    if (!data.value) return;

    const localUser = JSON.parse(data.value);

    try {

      const res = await axios.post(
        `${API}/wallet/user`,
        {
          username: localUser.username
        }
      );

      if (res.data.success) {

        setUser(res.data.user);

        await Preferences.set({
          key: "venomUser",
          value: JSON.stringify(res.data.user)
        });

        localStorage.setItem(
          "venomUser",
          JSON.stringify(res.data.user)
        );

      }

    } catch (err) {
      console.log(err);
    }

  }

  async function logout() {

    await Preferences.remove({
      key: "venomUser"
    });

    localStorage.removeItem("venomUser");

    window.location.href = "/";

  }

  return (

    <div style={page}>

      <h1 style={title}>
        Venom 🐍
      </h1>

      <div style={profile}>

        <h2>Welcome 👋</h2>

        <h2>
          {user ? user.username : "Loading..."}
        </h2>

        <h1>
          🪙 {user ? user.coins : 0}
        </h1>

        <p>Your Coins</p>

      </div>

      <div style={menu}>

        <Link to="/tasks">
          <button style={btn}>🚀 Available Tasks</button>
        </Link>

        <Link to="/orders">
          <button style={btn}>📦 My Orders</button>
        </Link>

        <Link to="/buycoins">
          <button style={btn}>💎 Buy Coins</button>
        </Link>

        <Link to="/campaign">
          <button style={btn}>📢 Create Campaign</button>
        </Link>

        <Link to="/leaderboard">
          <button style={btn}>🏆 Leaderboard</button>
        </Link>

        <Link to="/admin-login">
          <button style={adminBtn}>🔐 Admin Panel</button>
        </Link>

        <button
          style={btn}
          onClick={loadUser}
        >
          🔄 Refresh Coins
        </button>

        <button
          style={btn}
          onClick={logout}
        >
          🚪 Logout
        </button>

      </div>

    </div>

  );

}

const page = {
  minHeight: "100vh",
  padding: "25px",
  textAlign: "center",
  background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
  color: "white",
  fontFamily: "Arial"
};

const title = {
  fontSize: "42px"
};

const profile = {
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  borderRadius: "30px",
  padding: "30px",
  marginBottom: "30px"
};

const menu = {
  display: "grid",
  gap: "15px"
};

const btn = {
  width: "100%",
  padding: "16px",
  borderRadius: "20px",
  border: "none",
  background: "white",
  color: "#833ab4",
  fontSize: "18px",
  fontWeight: "bold"
};

const adminBtn = {
  width: "100%",
  padding: "16px",
  borderRadius: "20px",
  border: "none",
  background: "#111",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold"
};
