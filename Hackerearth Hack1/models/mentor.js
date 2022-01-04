const mongoose=require("mongoose");

const mentorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    topics:{
        type:Array,
        required:true
    }
},
);

module.exports=mongoose.model("Mentor",mentorSchema);