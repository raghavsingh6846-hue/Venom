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

router.post("/follow", (req, res) => {

  const { username } = req.body;

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

  user.coins += 3;

  saveDB(db);

  res.json({
    success: true,
    coins: user.coins
  });

});

router.post("/like", (req, res) => {

  const { username } = req.body;

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

  user.coins += 1;

  saveDB(db);

  res.json({
    success: true,
    coins: user.coins
  });

});

module.exports = router;
