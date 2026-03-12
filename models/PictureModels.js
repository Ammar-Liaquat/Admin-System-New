const mongoose = require("mongoose");

const pitureSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },

  avatar: {
    type: String,
    required: true,
  },
},{timestamps:true});

module.exports = mongoose.model("picture", pitureSchema);
