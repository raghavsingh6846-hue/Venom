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

router.post("/register", (req, res) => {

    const { username } = req.body;

    if (!username || username.trim() === "") {
        return res.json({
            success: false,
            message: "Username Required"
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
        coins: 0,
        followers: 0,
        likes: 0
    };

    db.users.push(user);

    saveDB(db);

    res.json({
        success: true,
        message: "Registration Successful",
        user
    });

});

router.post("/login", (req, res) => {

    const { username } = req.body;

    const db = loadDB();

    const user = db.users.find(
        u => u.username.toLowerCase() === username.toLowerCase()
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
