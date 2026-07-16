import { useEffect, useState } from "react";
import axios from "axios";

export default function Tasks() {

  const loginUser = JSON.parse(localStorage.getItem("venomUser"));

  const [campaigns, setCampaigns] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function loadCampaigns() {

    try {

      const res = await axios.get(
        "http://127.0.0.1:3000/tasks",
        {
          params: {
            username: loginUser.username
          }
        }
      );

      if (res.data.success) {
        setCampaigns(res.data.tasks);
      }

    } catch {

      alert("Server Error");

    }

  }

  async function uploadProof(campaignId) {

    const file = selectedFiles[campaignId];

    if (!file) {
      alert("Please Select Screenshot");
      return;
    }

    const formData = new FormData();

    formData.append("username", loginUser.username);
    formData.append("campaignId", campaignId);
    formData.append("screenshot", file);

    try {

      const res = await axios.post(
        "http://127.0.0.1:3000/proof/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert(res.data.message);

      loadCampaigns();

    } catch {

      alert("Upload Failed");

    }

  }

  return (

    <div style={{ padding:30 }}>

      <h1>Tasks</h1>

      {campaigns.length === 0 ? (

        <h3>No Task Available</h3>

      ) : (

        campaigns.map((c)=>(

          <div
            key={c.id}
            style={{
              border:"1px solid gray",
              borderRadius:"10px",
              padding:"15px",
              marginBottom:"20px"
            }}
          >

            <h3>{c.type}</h3>

            <p>👤 {c.username}</p>

            <p>🪙 Reward : {c.reward} Coins</p>

            <p>📦 Remaining : {c.quantity}</p>

            {c.type === "Comment" && (
              <p>💬 {c.commentText}</p>
            )}

            <a
              href={c.link}
              target="_blank"
              rel="noreferrer"
            >
              <button>
                Open Instagram
              </button>
            </a>

            <br /><br />

            <input
              type="file"
              accept="image/*"
              onChange={(e)=>
                setSelectedFiles({
                  ...selectedFiles,
                  [c.id]: e.target.files[0]
                })
              }
            />

            <br /><br />

            <button
              onClick={()=>uploadProof(c.id)}
            >
              Upload Proof
            </button>

          </div>

        ))

      )}

    </div>

  );

}
