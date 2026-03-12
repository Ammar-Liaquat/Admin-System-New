const mongoose = require("mongoose")

const photoSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },
    title: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    resolution:{
        type:String,
    }

},{timestamps:true})

module.exports = mongoose.model("photo",photoSchema)
