const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({
        success: true,
        leaderboard: [
            {
                username: "Admin",
                coins: 1000
            }
        ]
    });

});

module.exports = router;
