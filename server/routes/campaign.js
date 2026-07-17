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




// USER VIEW CAMPAIGNS

router.get(
"/",
(req,res)=>{


const db=loadDB();


const campaigns=(db.campaigns||[])
.filter(c=>c.status==="Active")
.map(c=>({

id:c.id,
type:c.type,
title:c.title,
link:c.link,
reward:c.reward,
quantity:c.quantity,
commentText:c.commentText || ""

}));



res.json({

success:true,

campaigns

});


});








// CREATE CAMPAIGN

router.post(
"/create",
(req,res)=>{


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




const qty=Number(quantity);



if(!qty || qty<=0){

return res.json({

success:false,

message:"Invalid Quantity"

});

}





let reward=0;


if(type==="Like")
reward=1;


if(type==="Follow")
reward=2;


if(type==="Comment")
reward=3;



const totalCoins=reward*qty;



if(user.coins < totalCoins){

return res.json({

success:false,

message:"Insufficient Coins"

});

}




user.coins-=totalCoins;



const campaign={

id:Date.now(),

username,

type,

title:type+" Task",

link,

reward,

quantity:qty,

commentText:commentText || "",

completed:[],

status:"Active",

createdAt:new Date().toISOString()

};



if(!db.campaigns){

db.campaigns=[];

}



db.campaigns.push(campaign);


saveDB(db);



res.json({

success:true,

message:"Campaign Created",

coins:user.coins

});


});








// ADMIN ALL

router.get(
"/admin/all",
(req,res)=>{


const db=loadDB();



res.json({

success:true,

campaigns:db.campaigns || []

});


});








// ADMIN DELETE

router.post(
"/admin/delete",
(req,res)=>{


const {id}=req.body;


const db=loadDB();



const index=db.campaigns.findIndex(
c=>c.id==id
);



if(index===-1){

return res.json({

success:false,

message:"Campaign Not Found"

});

}



db.campaigns.splice(index,1);



saveDB(db);



res.json({

success:true,

message:"Campaign Deleted"

});


});





module.exports=router;
