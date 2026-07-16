const express = require("express");
const fs = require("fs");

const router = express.Router();

const DB = "./db.json";

function loadDB() {
  return JSON.parse(fs.readFileSync(DB, "utf8"));
}

router.post("/", (req, res) => {

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

  res.json({
    success: true,
    user
  });

});

module.exports = router;
