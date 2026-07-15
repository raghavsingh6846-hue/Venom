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
    campaigns: db.campaigns
  });
});

router.post("/create", (req, res) => {

  const {
    title,
    username,
    link,
    reward,
    target,
    createdBy
  } = req.body;

  if (
    !title ||
    !username ||
    !link ||
    !reward ||
    !target
  ) {
    return res.json({
      success: false,
      message: "Fill all fields"
    });
  }

  const db = loadDB();

  const campaign = {
    id: Date.now(),
    title,
    username,
    link,
    reward: Number(reward),
    target: Number(target),
    status: "Active",
    createdBy,
    createdAt: new Date().toLocaleString()
  };

  db.campaigns.push(campaign);

  saveDB(db);

  res.json({
    success: true,
    campaign
  });

});

module.exports = router;
