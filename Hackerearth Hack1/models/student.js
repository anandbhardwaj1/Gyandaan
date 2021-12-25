const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    firstname:
    {
        type:String,
        required:true,

    },
    surname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    days:{
        type:Array,
        default:[]
    },
    timing:{
        type:Array,
        default:[]
    },
    topics:{
        type:Array,
        default:[]
    },
},
{timestamps:true}
);

module.exports=mongoose.model("Student",studentSchema);