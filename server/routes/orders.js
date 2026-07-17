const express = require("express");
const fs = require("fs");

const router = express.Router();

const DB = "./db.json";

function loadDB() {
  return JSON.parse(fs.readFileSync(DB, "utf8"));
}

// User ke orders
router.get("/my/:username", (req, res) => {

  const username = req.params.username;

  const db = loadDB();

  const campaigns = (db.campaigns || []).filter(
    c => c.username === username
  );

  const orders = campaigns.map(c => {

    const completed = c.completed ? c.completed.length : 0;

    return {

      id: c.id,
      title: c.title,
      type: c.type,
      reward: c.reward,
      quantity: c.quantity,
      completed,
      remaining: Math.max(c.quantity - completed, 0),
      coinsSpent: c.reward * c.quantity,
      status: c.status

    };

  });

  res.json({

    success: true,
    orders

  });

});

module.exports = router;
