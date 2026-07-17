const express = require("express");
const fs = require("fs");

const router = express.Router();

const DB = "./db.json";

function loadDB() {
  return JSON.parse(fs.readFileSync(DB, "utf8"));
}

// USER WALLET (LIVE DATA)

router.post("/user", (req, res) => {

  const { username } = req.body;

  if (!username) {
    return res.json({
      success: false,
      message: "Username Required"
    });
  }

  const db = loadDB();

  const user = db.users.find(
    u => u.username === username
  );

  if (!user) {
    return res.json({
      success: false,
      message: "User Not Found"
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      coins: user.coins || 0,
      followers: user.followers || 0,
      likes: user.likes || 0,
      trustScore: user.trustScore || 100,
      tasksCompleted: user.tasksCompleted || 0,
      status: user.status || "active"
    }
  });

});

module.exports = router;
