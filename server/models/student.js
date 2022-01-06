const mongoose=require("mongoose");

const studentSchema=new mongoose.Schema({
    name:{
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
    age:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        default:9111111111
    },
    topics:{
        type:Array
    }
   
   
   
    
},
{timestamps:true}
);

module.exports=mongoose.model("Student",studentSchema);