const mongoose = require("mongoose");

const parkSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },

    name: {
      type: String,
      required: "true",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("park", parkSchema);
