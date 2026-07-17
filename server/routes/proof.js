const express = require("express");
const fs = require("fs");
const multer = require("multer");

const router = express.Router();

const DB="./db.json";


const storage = multer.diskStorage({

destination:(req,file,cb)=>{
cb(null,"uploads/");
},

filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname);
}

});


const upload = multer({
storage
});



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





// USER UPLOAD TASK SCREENSHOT

router.post(
"/upload",
upload.single("screenshot"),
(req,res)=>{


const {
username,
campaignId,
type
}=req.body;


const db=loadDB();


const campaign=db.campaigns.find(
c=>c.id==campaignId
);


let reward=0;


if(campaign){

reward=campaign.reward;

}



const proof={

id:Date.now(),

username,

campaignId:Number(campaignId),

type,

reward,

screenshot:req.file
? req.file.filename
:"",

status:"Pending",

createdAt:new Date().toISOString()

};



if(!db.proofs){

db.proofs=[];

}


db.proofs.push(proof);


saveDB(db);



res.json({

success:true,

message:"Screenshot Submitted"

});


});







// ADMIN PENDING

router.get(
"/pending",
(req,res)=>{


const db=loadDB();


res.json({

success:true,

proofs:(db.proofs||[]).filter(
p=>p.status==="Pending"
)

});


});







// APPROVE

router.post(
"/approve",
(req,res)=>{


const {id}=req.body;


const db=loadDB();



const proof=db.proofs.find(
p=>p.id==id
);



if(!proof){

return res.json({

success:false,

message:"Proof Not Found"

});

}




const user=db.users.find(
u=>u.username===proof.username
);



const campaign=db.campaigns.find(
c=>c.id==proof.campaignId
);



// OLD PROOFS FIX

if(!proof.reward && campaign){

proof.reward=campaign.reward;

}



if(user){

user.coins =
(user.coins || 0)+proof.reward;


user.tasksCompleted =
(user.tasksCompleted || 0)+1;


user.trustScore =
(user.trustScore || 100)+1;

}





if(campaign){


campaign.quantity=Math.max(
0,
campaign.quantity-1
);



if(!campaign.completed){

campaign.completed=[];

}



if(!campaign.completed.includes(
proof.username
)){

campaign.completed.push(
proof.username
);

}



if(campaign.quantity===0){

campaign.status="Completed";

}


}




proof.status="Approved";


saveDB(db);



res.json({

success:true,

message:"Task Approved"

});


});









// REJECT

router.post(
"/reject",
(req,res)=>{


const {id}=req.body;


const db=loadDB();


const proof=db.proofs.find(
p=>p.id==id
);



if(!proof){

return res.json({

success:false,

message:"Proof Not Found"

});

}



proof.status="Rejected";


const user=db.users.find(
u=>u.username===proof.username
);


if(user){

user.trustScore =
(user.trustScore||100)-1;

}



saveDB(db);



res.json({

success:true,

message:"Task Rejected"

});


});





module.exports=router;
