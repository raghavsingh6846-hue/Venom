import { useState } from "react";
import axios from "axios";

export default function Campaign() {

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [reward, setReward] = useState("");

  async function createCampaign() {

    try {

      const res = await axios.post(
        "http://127.0.0.1:3000/campaign/create",
        {
          title,
          link,
          reward
        }
      );

      if (res.data.success) {

        alert("Campaign Created");

        setTitle("");
        setLink("");
        setReward("");

      }

    } catch {

      alert("Server Error");

    }

  }

  return (

    <div style={{ padding: 30, textAlign: "center" }}>

      <h1>Create Campaign</h1>

      <input
        placeholder="Campaign Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Instagram Link"
        value={link}
        onChange={(e)=>setLink(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Reward Coins"
        value={reward}
        onChange={(e)=>setReward(e.target.value)}
      />

      <br /><br />

      <button onClick={createCampaign}>
        Create Campaign
      </button>

    </div>

  );

}
