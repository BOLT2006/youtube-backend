import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    _id : mongoose.Schema.Types.ObjectId,

    channelName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    phone : {
        type : String,
        required : true
    },

    


    
})