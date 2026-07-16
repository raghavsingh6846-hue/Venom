const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const DB = "./coin_requests.json";
const USER_DB = "./db.json";



const storage = multer.diskStorage({

  destination:(req,file,cb)=>{

    cb(null,"uploads");

  },


  filename:(req,file,cb)=>{

    cb(
      null,
      Date.now()+"-"+file.originalname
    );

  }

});


const upload = multer({
  storage
});





function loadRequests(){

 return JSON.parse(
  fs.readFileSync(DB,"utf8")
 );

}



function saveRequests(data){

 fs.writeFileSync(
  DB,
  JSON.stringify(data,null,2)
 );

}



function loadUsers(){

 return JSON.parse(
  fs.readFileSync(USER_DB,"utf8")
 );

}



function saveUsers(data){

 fs.writeFileSync(
  USER_DB,
  JSON.stringify(data,null,2)
 );

}





// USER PAYMENT REQUEST

router.post(
"/request",
upload.single("screenshot"),
(req,res)=>{


const {
 username,
 packageName,
 amount
}=req.body;



const requests=loadRequests();



const request={

 id:Date.now(),

 username,

 packageName,

 amount,

 screenshot:req.file
 ? req.file.filename
 : "",

 status:"pending"

};



requests.push(request);


saveRequests(requests);



res.json({

 success:true,

 message:"Payment Request Submitted"

});



});






// ADMIN VIEW REQUESTS

router.get(
"/requests",
(req,res)=>{


const requests=loadRequests();


res.json({

success:true,

requests

});


});







// APPROVE COINS

router.post(
"/approve",
(req,res)=>{


const {id}=req.body;


const requests=loadRequests();



const request=requests.find(
r=>r.id==id
);



if(!request){

return res.json({

success:false,

message:"Request Not Found"

});

}




const users=loadUsers();



const user=users.users.find(
u=>u.username===request.username
);



if(user){


let coins=0;



if(request.packageName==="50 Coins")
coins=50;


if(request.packageName==="100 Coins")
coins=100;


if(request.packageName==="320 Coins")
coins=320;



user.coins+=coins;



saveUsers(users);


}



request.status="approved";


saveRequests(requests);



res.json({

success:true,

message:"Coins Added"

});



});







// REJECT

router.post(
"/reject",
(req,res)=>{


const {id}=req.body;


const requests=loadRequests();



const request=requests.find(
r=>r.id==id
);



if(request){

request.status="rejected";

}



saveRequests(requests);



res.json({

success:true,

message:"Rejected"

});


});





module.exports=router;
