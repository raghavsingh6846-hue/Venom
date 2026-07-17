const express = require("express");
const fs = require("fs");

const router = express.Router();

const DB = "./db.json";

function loadDB() {
  return JSON.parse(
    fs.readFileSync(DB, "utf8")
  );
}

function saveDB(data) {
  fs.writeFileSync(
    DB,
    JSON.stringify(data, null, 2)
  );
}

/* REGISTER */

router.post("/register", (req, res) => {

  const {
    username,
    password
  } = req.body;

  if (!username || !password) {

    return res.json({
      success: false,
      message: "Username and Password Required"
    });

  }

  const db = loadDB();

  const exists = db.users.find(
    u => u.username.toLowerCase() === username.toLowerCase()
  );

  if (exists) {

    return res.json({
      success: false,
      message: "Username Already Exists"
    });

  }

  const user = {

    id: Date.now(),

    username,

    password,

    coins: 0,

    followers: 0,

    likes: 0,

    trustScore: 100,

    tasksCompleted: 0,

    status: "active",

    createdAt: new Date().toISOString()

  };

  db.users.push(user);

  saveDB(db);

  res.json({

    success: true,

    message: "Registration Successful"

  });

});


/* LOGIN */

router.post("/login", (req, res) => {

  const {
    username,
    password
  } = req.body;

  const db = loadDB();

  const user = db.users.find(
    u =>
      u.username === username &&
      u.password === password
  );

  if (!user) {

    return res.json({

      success: false,

      message: "Invalid Username or Password"

    });

  }

  if (user.status === "blocked") {

    return res.json({

      success: false,

      message: "Account Suspended"

    });

  }

  const latestUser = {

    id: user.id,

    username: user.username,

    coins: user.coins || 0,

    followers: user.followers || 0,

    likes: user.likes || 0,

    trustScore: user.trustScore || 100,

    tasksCompleted: user.tasksCompleted || 0,

    status: user.status || "active"

  };

  res.json({

    success: true,

    user: latestUser

  });

});

module.exports = router;
