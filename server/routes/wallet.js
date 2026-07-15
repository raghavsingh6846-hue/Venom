const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({
        success: true,
        coins: 0,
        followers: 0,
        likes: 0
    });

});

module.exports = router;
