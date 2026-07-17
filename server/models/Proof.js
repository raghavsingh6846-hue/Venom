const mongoose = require("mongoose");

const ProofSchema = new mongoose.Schema({

  username:{
    type:String,
    required:true
  },

  campaignId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },

  type:{
    type:String,
    required:true
  },

  reward:{
    type:Number,
    default:0
  },

  screenshot:{
    type:String,
    default:""
  },

  status:{
    type:String,
    default:"Pending"
  }

},{
  timestamps:true
});

module.exports = mongoose.model("Proof", ProofSchema);
