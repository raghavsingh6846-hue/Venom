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

/* ---------- ADMIN LOGIN ---------- */

router.post("/login", (req, res) => {

  const { username, password } = req.body;

  const db = loadDB();

  if (
    !db.admin ||
    db.admin.username !== username ||
    db.admin.password !== password
  ) {
    return res.json({
      success: false,
      message: "Invalid Admin Login"
    });
  }

  res.json({
    success: true,
    admin: {
      username: db.admin.username
    }
  });

});

/* ---------- PENDING PROOFS ---------- */

router.get("/proofs", (req, res) => {

  const db = loadDB();

  res.json({
    success: true,
    proofs: (db.proofs || []).filter(
      p => p.status === "Pending"
    )
  });

});

/* ---------- APPROVE ---------- */

router.post("/approve", (req, res) => {

  const { proofId } = req.body;

  const db = loadDB();

  const proof = (db.proofs || []).find(
    p => p.id == proofId
  );

  if (!proof) {
    return res.json({
      success: false,
      message: "Proof Not Found"
    });
  }

  const campaign = db.campaigns.find(
    c => c.id == proof.campaignId
  );

  const user = db.users.find(
    u => u.username == proof.username
  );

  if (!campaign || !user) {
    return res.json({
      success: false,
      message: "Invalid Data"
    });
  }

  proof.status = "Approved";

  user.trustScore = (user.trustScore || 100) + 2;
  user.coins += campaign.reward;

  saveDB(db);

  res.json({
    success: true,
    message: "Proof Approved"
  });

});

/* ---------- REJECT ---------- */

router.post("/reject", (req, res) => {

  const { proofId } = req.body;

  const db = loadDB();

  const proof = (db.proofs || []).find(
    p => p.id == proofId
  );

  if (!proof) {
    return res.json({
      success: false,
      message: "Proof Not Found"
    });
  }

  const user = db.users.find(
    u => u.username == proof.username
  );

  proof.status = "Rejected";

  user.trustScore = user.trustScore || 100;
  user.rejectCount = user.rejectCount || 0;

  user.rejectCount++;

  const penalty = user.rejectCount * 5;

  user.trustScore -= 5;
  user.coins = Math.max(0, user.coins - penalty);

  saveDB(db);

  res.json({
    success: true,
    message: "Proof Rejected",
    penalty
  });

});

module.exports = router;
