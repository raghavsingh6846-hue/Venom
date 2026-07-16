const express = require("express");
const fs = require("fs");

const router = express.Router();

const DB = "./db.json";

function loadDB() {
  return JSON.parse(fs.readFileSync(DB, "utf8"));
}

router.get("/", (req, res) => {

  const db = loadDB();

  const leaderboard = [...db.users].sort(
    (a, b) => b.coins - a.coins
  );

  res.json({
    success: true,
    leaderboard
  });

});

module.exports = router;
