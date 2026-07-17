const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  coins: {
    type: Number,
    default: 0
  },

  followers: {
    type: Number,
    default: 0
  },

  likes: {
    type: Number,
    default: 0
  },

  trustScore: {
    type: Number,
    default: 100
  },

  tasksCompleted: {
    type: Number,
    default: 0
  },

  ordersCreated: {
    type: Number,
    default: 0
  },

  referralCode: {
    type: String,
    default: ""
  },

  referredBy: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    default: "active"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("User", UserSchema);
