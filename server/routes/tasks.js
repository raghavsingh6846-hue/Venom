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





// USER TASK BOARD

router.get(
"/",
(req,res)=>{


const username=req.query.username;


const db=loadDB();



const tasks=(db.campaigns||[])
.filter(c=>{


if(c.status!=="Active")
return false;



if(username){

if(c.username===username)
return false;



const completed=c.completed||[];


if(completed.includes(username))
return false;



const proof=(db.proofs||[]).find(
p =>
p.username===username &&
p.campaignId==c.id &&
(
p.status==="Pending" ||
p.status==="Approved"
)

);



if(proof)
return false;


}



if(c.quantity<=0)
return false;



return true;


})
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

tasks

});


});








// COMPLETE TASK

router.post(
"/complete",
(req,res)=>{


const {
username,
campaignId
}=req.body;



const db=loadDB();



const campaign=db.campaigns.find(
c=>c.id==campaignId
);



if(!campaign){

return res.json({

success:false,

message:"Campaign Not Found"

});

}



if(!campaign.completed){

campaign.completed=[];

}



if(campaign.completed.includes(username)){

return res.json({

success:false,

message:"Already Completed"

});

}



campaign.completed.push(username);



saveDB(db);



res.json({

success:true,

message:"Task Completed"

});


});





module.exports=router;
