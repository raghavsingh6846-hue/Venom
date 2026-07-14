const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {

    res.json({
        success: true,
        coins: 100,
        followers: 0,
        likes: 0
    });

});

module.exports = router;
