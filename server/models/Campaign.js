const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    default: ""
  },

  reward: {
    type: Number,
    default: 0
  },

  quantity: {
    type: Number,
    default: 0
  },

  commentText: {
    type: String,
    default: ""
  },

  completed: {
    type: [String],
    default: []
  },

  status: {
    type: String,
    default: "Active"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Campaign", CampaignSchema);

