const mongoose = require("mongoose");

const framesSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },

  avatar: {
    type: String,
    required: true,
  },
},{timestamps:true});

module.exports = mongoose.model("frame", framesSchema);
