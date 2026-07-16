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

users:db.users.map(u=>({

id:u.id,

username:u.username,

coins:u.coins,

trustScore:u.trustScore || 100,

tasksCompleted:u.tasksCompleted || 0,

status:u.status || "active",

createdAt:u.createdAt

}))

});


});





/* BLOCK USER */


router.post("/block",(req,res)=>{


const {id}=req.body;


const db=loadDB();



const user=db.users.find(
u=>u.id==id
);



if(user){

user.status="blocked";

saveDB(db);


return res.json({

success:true,

message:"User Blocked"

});

}



res.json({

success:false,

message:"User not found"

});


});






/* UNBLOCK USER */


router.post("/unblock",(req,res)=>{


const {id}=req.body;


const db=loadDB();



const user=db.users.find(
u=>u.id==id
);



if(user){

user.status="active";


saveDB(db);



return res.json({

success:true,

message:"User Unblocked"

});


}



res.json({

success:false,

message:"User not found"

});


});




module.exports=router;
