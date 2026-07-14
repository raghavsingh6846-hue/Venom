import { Link } from "react-router-dom";

export default function Campaign() {
  return (
    <div style={{padding:"30px",textAlign:"center"}}>

      <h1>Create Campaign</h1>

      <input
        placeholder="Instagram Username"
        style={{padding:"10px",width:"260px",margin:"10px"}}
      />

      <br/>

      <select style={{padding:"10px",width:"280px"}}>
        <option>Follow Campaign (+3 Coins)</option>
        <option>Like Campaign (+1 Coin)</option>
      </select>

      <br/><br/>

      <input
        placeholder="Total Coins"
        style={{padding:"10px",width:"260px"}}
      />

      <br/><br/>

      <button>Create Campaign</button>

      <br/><br/>

      <Link to="/home">
        <button>Back</button>
      </Link>

    </div>
  );
}
