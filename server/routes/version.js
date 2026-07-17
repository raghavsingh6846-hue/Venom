const express = require("express");

const router = express.Router();


router.get("/", (req,res)=>{

res.json({

success:true,

version:"1.0.0",

apkUrl:"PASTE_APK_LINK_HERE",

forceUpdate:true

});

});


module.exports = router;
