const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  { 
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    isPaid :{
      type:Boolean,
      default:false
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    park: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userSchema);
 