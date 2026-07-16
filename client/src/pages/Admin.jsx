import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {

  const [proofs, setProofs] = useState([]);

  useEffect(() => {
    loadProofs();
  }, []);

  async function loadProofs() {

    try {

      const res = await axios.get(
        "http://127.0.0.1:3000/admin/proofs"
      );

      if (res.data.success) {
        setProofs(res.data.proofs);
      }

    } catch {

      alert("Server Error");

    }

  }

  async function approve(proofId) {

    try {

      const res = await axios.post(
        "http://127.0.0.1:3000/admin/approve",
        { proofId }
      );

      alert(res.data.message);

      loadProofs();

    } catch {

      alert("Server Error");

    }

  }

  async function reject(proofId) {

    try {

      const res = await axios.post(
        "http://127.0.0.1:3000/admin/reject",
        { proofId }
      );

      alert(res.data.message);

      loadProofs();

    } catch {

      alert("Server Error");

    }

  }

  return (

    <div style={{ padding:30 }}>

      <h1>Admin Panel</h1>

      {proofs.length === 0 ? (

        <h3>No Pending Proof</h3>

      ) : (

        proofs.map((p)=>(

          <div
            key={p.id}
            style={{
              border:"1px solid #999",
              borderRadius:"10px",
              padding:"15px",
              marginBottom:"20px"
            }}
          >

            <h3>{p.username}</h3>

            <p>Campaign ID : {p.campaignId}</p>

            <p>Status : {p.status}</p>

            <p>Trust Score : {p.trustScore}</p>

            <img
              src={`http://127.0.0.1:3000/uploads/${p.screenshot}`}
              alt=""
              width="250"
            />

            <br /><br />

            <button
              onClick={()=>approve(p.id)}
            >
              ✅ Approve
            </button>

            {" "}

            <button
              onClick={()=>reject(p.id)}
            >
              ❌ Reject
            </button>

          </div>

        ))

      )}

    </div>

  );

}
