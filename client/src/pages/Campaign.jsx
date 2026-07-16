import { useState } from "react";
import axios from "axios";

export default function Campaign() {

  const loginUser = JSON.parse(localStorage.getItem("venomUser"));

  const [type, setType] = useState("Follow");
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [commentText, setCommentText] = useState("");

  async function createCampaign() {

    try {

      const res = await axios.post(
        "http://127.0.0.1:3000/campaign/create",
        {
          username: loginUser.username,
          type,
          link,
          quantity,
          commentText
        }
      );

      if (res.data.success) {

        alert("Campaign Created");

        setType("Follow");
        setLink("");
        setQuantity("");
        setCommentText("");

      } else {

        alert(res.data.message);

      }

    } catch {

      alert("Server Error");

    }

  }

  return (

    <div style={{ padding:30, textAlign:"center" }}>

      <h1>Create Order</h1>

      <select
        value={type}
        onChange={(e)=>setType(e.target.value)}
      >
        <option>Follow</option>
        <option>Like</option>
        <option>Comment</option>
      </select>

      <br /><br />

      <input
        placeholder="Instagram Link"
        value={link}
        onChange={(e)=>setLink(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e)=>setQuantity(e.target.value)}
      />

      <br /><br />

      {type === "Comment" && (
        <>
          <textarea
            placeholder="Comment Text"
            value={commentText}
            onChange={(e)=>setCommentText(e.target.value)}
          />
          <br /><br />
        </>
      )}

      <button onClick={createCampaign}>
        Create Order
      </button>

    </div>

  );

}
