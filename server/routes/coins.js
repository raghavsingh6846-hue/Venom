const express = require("express");
const fs = require("fs");
const multer = require("multer");

const router = express.Router();

const DB="./db.json";
const REQUEST_DB="./coin_requests.json";


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



function loadRequests(){

if(!fs.existsSync(REQUEST_DB)){
return [];
}

return JSON.parse(
fs.readFileSync(REQUEST_DB,"utf8")
);

}



function saveRequests(data){

fs.writeFileSync(
REQUEST_DB,
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

amount:Number(amount),

screenshot:req.file
?req.file.filename
:"",

status:"Pending",

createdAt:new Date().toISOString()

};



requests.push(request);


saveRequests(requests);



res.json({

success:true,

message:"Payment Submitted"

});


});







// ADMIN GET REQUESTS

router.get(
"/requests",
(req,res)=>{


const requests=loadRequests();


res.json({

success:true,

requests:requests.filter(
r=>r.status==="Pending"
)

});


});









// ADMIN APPROVE

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



const db=loadDB();



const user=db.users.find(
u=>u.username===request.username
);



if(!user){

return res.json({

success:false,

message:"User Not Found"

});

}





const coinsMap={

"20 Coins":70,

"50 Coins":180,

"100 Coins":400

};




const coins =
coinsMap[request.packageName] || 0;



user.coins =
(user.coins || 0)+coins;



request.status="Approved";



saveDB(db);

saveRequests(requests);



res.json({

success:true,

message:`${coins} Coins Added`

});


});









// ADMIN REJECT

router.post(
"/reject",
(req,res)=>{


const {id}=req.body;


const requests=loadRequests();


const request=requests.find(
r=>r.id==id
);



if(request){

request.status="Rejected";

saveRequests(requests);


return res.json({

success:true,

message:"Payment Rejected"

});

}



res.json({

success:false,

message:"Request Not Found"

});


});





module.exports=router;
