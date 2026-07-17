import { useEffect, useState } from "react";
import axios from "axios";
import { Preferences } from "@capacitor/preferences";
import { Link } from "react-router-dom";

const API = "https://venom-server-5dey.onrender.com";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {

    try {

      const data = await Preferences.get({
        key: "venomUser"
      });

      if (!data.value) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(data.value);

      const res = await axios.get(
        `${API}/orders/my/${user.username}`
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }

    } catch (err) {
      console.log(err);
    }

    setLoading(false);

  }

  if (loading) {
    return (
      <div style={{
        color: "white",
        background: "#111",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "22px"
      }}>
        Loading...
      </div>
    );
  }

  return (

    <div style={{
      background: "#111",
      color: "white",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Arial"
    }}>

      <h1 style={{
        textAlign: "center"
      }}>
        📦 My Orders
      </h1>

      {
        orders.length === 0 && (

          <div style={{
            textAlign: "center",
            marginTop: "60px",
            fontSize: "20px"
          }}>
            No Orders Found
          </div>

        )
      }

      {
        orders.map(order => (

          <div
            key={order.id}
            style={{
              background: "#222",
              padding: "20px",
              borderRadius: "20px",
              marginTop: "20px"
            }}
          >

            <h2>{order.title}</h2>

            <p>Task : {order.type}</p>

            <p>Reward : 🪙 {order.reward}</p>

            <p>Total Quantity : {order.quantity}</p>

            <p>Completed : {order.completed}</p>

            <p>Remaining : {order.remaining}</p>

            <p>Coins Spent : {order.coinsSpent}</p>

            <p>Status : {order.status}</p>

            <div style={{
              width: "100%",
              height: "12px",
              background: "#444",
              borderRadius: "20px",
              overflow: "hidden",
              marginTop: "15px"
            }}>

              <div
                style={{
                  width:
                    order.quantity === 0
                      ? "100%"
                      : `${(order.completed / order.quantity) * 100}%`,
                  height: "100%",
                  background: "#00c853"
                }}
              />

            </div>

          </div>

        ))
      }

      <Link to="/home">

        <button
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "15px",
            borderRadius: "20px",
            border: "none",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          ⬅ Back Home
        </button>

      </Link>

    </div>

  );

}
