const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({

  username:{
    type:String,
    required:true
  },

  packageName:{
    type:String,
    required:true
  },

  amount:{
    type:Number,
    required:true
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

module.exports = mongoose.model("Payment", PaymentSchema);
