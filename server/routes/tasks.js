const express = require("express");
const fs = require("fs");

const router = express.Router();

const DB = "./db.json";

function loadDB() {
  return JSON.parse(fs.readFileSync(DB, "utf8"));
}

router.get("/", (req, res) => {

  const username = req.query.username;

  const db = loadDB();

  const tasks = db.campaigns.filter(c => {

    if (c.status !== "Active") return false;

    if (!username) return true;

    if (c.username === username) return false;

    const completed = c.completed || [];

    if (completed.includes(username)) {
      return false;
    }

    const proofs = db.proofs || [];

    const pending = proofs.find(p =>
      p.username === username &&
      p.campaignId == c.id &&
      (p.status === "Pending" || p.status === "Approved")
    );

    if (pending) {
      return false;
    }

    return true;

  });

  res.json({
    success: true,
    tasks
  });

});

router.post("/complete", (req, res) => {

  const { username, campaignId } = req.body;

  const db = loadDB();

  const campaign = db.campaigns.find(
    c => c.id == campaignId
  );

  if (!campaign) {
    return res.json({
      success: false,
      message: "Campaign Not Found"
    });
  }

  if (!campaign.completed) {
    campaign.completed = [];
  }

  if (campaign.completed.includes(username)) {
    return res.json({
      success: false,
      message: "Already Completed"
    });
  }

  campaign.completed.push(username);

  fs.writeFileSync(
    DB,
    JSON.stringify(db, null, 2)
  );

  res.json({
    success: true,
    message: "Task Completed"
  });

});

module.exports = router;
