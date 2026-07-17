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



/* GET ALL USERS */

router.get("/users",(req,res)=>{


const db=loadDB();


res.json({

success:true,

users:(db.users || []).map(u=>({

id:u.id,

username:u.username,

coins:u.coins || 0,

trustScore:u.trustScore || 100,

tasksCompleted:u.tasksCompleted || 0,

createdAt:u.createdAt

}))

});


});





/* DELETE USER COMPLETELY */

router.post("/delete-user",(req,res)=>{


const {id}=req.body;


const db=loadDB();



const user=db.users.find(
u=>u.id==id
);



if(!user){

return res.json({

success:false,

message:"User Not Found"

});

}





// delete user

db.users =
db.users.filter(
u=>u.id!=id
);





// delete user's campaigns

db.campaigns =
(db.campaigns || []).filter(
c=>c.username!==user.username
);





// delete user's proofs

db.proofs =
(db.proofs || []).filter(
p=>p.username!==user.username
);





saveDB(db);



res.json({

success:true,

message:"User Deleted Successfully"

});


});





module.exports=router;
