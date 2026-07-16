const express = require("express");
const fs = require("fs");

const router = express.Router();

const DB = "./db.json";

function loadDB() {
  return JSON.parse(fs.readFileSync(DB, "utf8"));
}

function saveDB(data) {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

router.get("/", (req, res) => {

  const db = loadDB();

  res.json({
    success: true,
    campaigns: db.campaigns.filter(c => c.status === "Active")
  });

});

router.post("/create", (req, res) => {

  const {
    username,
    type,
    link,
    quantity,
    commentText
  } = req.body;

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

  let reward = 0;

  if (type === "Like") reward = 1;
  if (type === "Follow") reward = 2;
  if (type === "Comment") reward = 3;

  const totalCoins = reward * Number(quantity);

  if (user.coins < totalCoins) {
    return res.json({
      success: false,
      message: "Insufficient Coins"
    });
  }

  user.coins -= totalCoins;

  const campaign = {
    id: Date.now(),
    username,
    type,
    title: type + " Task",
    link,
    reward,
    quantity: Number(quantity),
    commentText: commentText || "",
    completed: [],
    status: "Active"
  };

  db.campaigns.push(campaign);

  saveDB(db);

  res.json({
    success: true,
    campaign,
    coins: user.coins
  });

});

module.exports = router;
