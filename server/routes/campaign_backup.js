const express = require("express");
const fs = require("fs");

const router = express.Router();

const DB="./db.json";


function loadDB(){

return JSON.parse(
fs.readFileSync(DB,"utf8")
);

}


function saveDB(data){

fs.writeFileSync(
DB,
JSON.stringify(data,null,2)
);

}





// USER ACTIVE CAMPAIGNS

router.get("/",(req,res)=>{


const db=loadDB();


res.json({

success:true,

campaigns:
db.campaigns.filter(
c=>c.status==="Active"
)

});


});







// CREATE CAMPAIGN


router.post("/create",(req,res)=>{


const {
username,
type,
link,
quantity,
commentText
}=req.body;



const db=loadDB();



const user=db.users.find(
u=>u.username===username
);



if(!user){

return res.json({

success:false,

message:"User Not Found"

});

}





let reward=0;


if(type==="Like")
reward=1;


if(type==="Follow")
reward=2;


if(type==="Comment")
reward=3;





const totalCoins =
reward * Number(quantity);




if(user.coins < totalCoins){

return res.json({

success:false,

message:"Insufficient Coins"

});

}



user.coins -= totalCoins;



const campaign={


id:Date.now(),


username,


type,


title:type+" Task",


link,


reward,


quantity:Number(quantity),


commentText:commentText || "",


completed:[],


status:"Active",


createdAt:new Date()

};



db.campaigns.push(campaign);



saveDB(db);



res.json({

success:true,

campaign,

coins:user.coins

});



});








// ADMIN ALL CAMPAIGNS


router.get(
"/admin/all",
(req,res)=>{


const db=loadDB();



res.json({

success:true,

campaigns:db.campaigns

});


});









// ADMIN DELETE CAMPAIGN


router.post(
"/admin/delete",
(req,res)=>{


const {id}=req.body;



const db=loadDB();



db.campaigns =
db.campaigns.filter(
c=>c.id!=id
);




if(db.proofs){

db.proofs =
db.proofs.filter(
p=>p.campaignId!=id
);

}



saveDB(db);



res.json({

success:true,

message:"Campaign Deleted"

});


});




module.exports=router;
