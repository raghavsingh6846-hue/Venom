const express = require("express");
const fs = require("fs");

const router = express.Router();

const DB = "./db.json";
const COIN_DB = "./coin_requests.json";


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


function loadCoins(){

  return JSON.parse(
    fs.readFileSync(COIN_DB,"utf8")
  );

}


function saveCoins(data){

  fs.writeFileSync(
    COIN_DB,
    JSON.stringify(data,null,2)
  );

}



/* ADMIN LOGIN */

router.post("/login",(req,res)=>{

 const {username,password}=req.body;

 const db=loadDB();


 if(
  !db.admin ||
  db.admin.username!==username ||
  db.admin.password!==password
 ){

  return res.json({
   success:false,
   message:"Invalid Admin Login"
  });

 }


 res.json({

  success:true,

  admin:{
   username:db.admin.username
  }

 });


});





/* TASK PROOFS */


router.get("/proofs",(req,res)=>{

 const db=loadDB();


 res.json({

  success:true,

  proofs:(db.proofs||[]).filter(
   p=>p.status==="Pending"
  )

 });


});





router.post("/approve",(req,res)=>{


 const {proofId}=req.body;

 const db=loadDB();


 const proof=(db.proofs||[]).find(
  p=>p.id==proofId
 );


 if(!proof){

  return res.json({
   success:false,
   message:"Proof Not Found"
  });

 }



 const campaign=db.campaigns.find(
  c=>c.id==proof.campaignId
 );


 const user=db.users.find(
  u=>u.username==proof.username
 );


 if(!campaign || !user){

  return res.json({
   success:false,
   message:"Invalid Data"
  });

 }


 proof.status="Approved";


 user.trustScore=(user.trustScore||100)+2;

 user.coins+=campaign.reward;


 saveDB(db);


 res.json({

  success:true,
  message:"Proof Approved"

 });


});





router.post("/reject",(req,res)=>{


 const {proofId}=req.body;


 const db=loadDB();


 const proof=(db.proofs||[]).find(
  p=>p.id==proofId
 );


 if(!proof){

  return res.json({
   success:false,
   message:"Proof Not Found"
  });

 }


 const user=db.users.find(
  u=>u.username==proof.username
 );


 proof.status="Rejected";


 if(user){

  user.trustScore=user.trustScore||100;

  user.rejectCount=user.rejectCount||0;

  user.rejectCount++;

  user.trustScore-=5;

  const penalty=user.rejectCount*5;

  user.coins=Math.max(
   0,
   user.coins-penalty
  );

 }


 saveDB(db);


 res.json({

  success:true,
  message:"Proof Rejected"

 });


});






/* =========================
   COIN PAYMENT REQUESTS
========================= */



router.get("/coin-requests",(req,res)=>{


 const requests=loadCoins();


 res.json({

  success:true,

  requests:requests.filter(
   r=>r.status==="pending"
  )

 });


});





router.post("/coin-approve",(req,res)=>{


 const {id}=req.body;


 const requests=loadCoins();


 const request=requests.find(
  r=>r.id==id
 );


 if(!request){

  return res.json({

   success:false,

   message:"Request Not Found"

  });

 }



 const db=loadDB();



 const user=db.users.find(
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


 }



 request.status="approved";


 saveDB(db);

 saveCoins(requests);



 res.json({

  success:true,

  message:"Coins Added"

 });


});





router.post("/coin-reject",(req,res)=>{


 const {id}=req.body;


 const requests=loadCoins();


 const request=requests.find(
  r=>r.id==id
 );


 if(request){

  request.status="rejected";

 }


 saveCoins(requests);



 res.json({

  success:true,

  message:"Payment Rejected"

 });


});





module.exports=router;
