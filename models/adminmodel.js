const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true,
    enum:["admin","user"]
  },
  refreshtoken:{
    type:String
  },
},{timestamps:true});

module.exports = mongoose.model("admin",adminSchema);
