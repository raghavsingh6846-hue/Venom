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


const upload=multer({
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




// USER UPLOAD PROOF


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



if(!db.proofs){

db.proofs=[];

}



let reward=0;



if(type==="Like")
reward=1;


if(type==="Follow")
reward=2;


if(type==="Comment")
reward=3;





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


createdAt:new Date()

};



db.proofs.push(proof);



saveDB(db);



res.json({

success:true,

message:"Proof Uploaded"

});



});







// ADMIN VIEW PENDING PROOFS


router.get(
"/pending",
(req,res)=>{


const db=loadDB();



res.json({

success:true,

proofs:
(db.proofs || []).filter(
p=>p.status==="Pending"
)

});


});







// ADMIN APPROVE


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

message:"Not Found"

});

}





const user=db.users.find(
u=>u.username===proof.username
);



if(user){


user.coins += proof.reward;


user.tasksCompleted =
(user.tasksCompleted || 0)+1;



user.trustScore =
(user.trustScore || 100)+1;


}




proof.status="Approved";



saveDB(db);



res.json({

success:true,

message:"Approved"

});


});








// ADMIN REJECT


router.post(
"/reject",
(req,res)=>{


const {id}=req.body;



const db=loadDB();



const proof=db.proofs.find(
p=>p.id==id
);



if(proof){


proof.status="Rejected";



const user=db.users.find(
u=>u.username===proof.username
);



if(user){

user.trustScore =
(user.trustScore || 100)-1;

}


}



saveDB(db);



res.json({

success:true,

message:"Rejected"

});



});




module.exports=router;
