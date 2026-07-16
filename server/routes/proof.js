const express = require("express");
const fs = require("fs");
const multer = require("multer");

const router = express.Router();

const DB = "./db.json";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

function loadDB() {
  return JSON.parse(fs.readFileSync(DB, "utf8"));
}

function saveDB(data) {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

router.post("/upload", upload.single("screenshot"), (req, res) => {

  const { username, campaignId } = req.body;

  const db = loadDB();

  if (!db.proofs) {
    db.proofs = [];
  }

  const proof = {
    id: Date.now(),
    username,
    campaignId: Number(campaignId),
    screenshot: req.file ? req.file.filename : "",
    status: "Pending",
    trustScore: 100,
    createdAt: new Date().toISOString()
  };

  db.proofs.push(proof);

  saveDB(db);

  res.json({
    success: true,
    message: "Proof Uploaded Successfully"
  });

});

router.get("/", (req, res) => {

  const db = loadDB();

  res.json({
    success: true,
    proofs: db.proofs || []
  });

});

module.exports = router;
