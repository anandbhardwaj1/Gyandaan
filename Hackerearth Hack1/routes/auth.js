const router=require("express").Router();
const { userInfo } = require("os");
const Student=require("../models/student");
const bcrypt=require("bcrypt");

router.post("/register",async (req,res)=>{
try{
    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(req.body.password,salt);
    const newStudent=await new Student({
        username:req.body.username,
        email:req.body.email,
        firstname:req.body.firstname,
        surname:req.body.surname,
        password:hashed,
        topics:req.body.topics
    
    })  
    const student=await newStudent.save();
    res.status(200).json(student)

}
catch(err){
    console.log(err);
} 
});

router.post('/login',async (req,res)=>{
    try{
        const student=await Student.findOne({username:req.body.username});
        !student && res.status(404).json("Not found");
        const validPassword=await bcrypt.compare(req.body.password,student.password);
        !validPassword && res.status(404).json("Invalid Password");

        const{password, ...others}=student._doc;
        res.status(200).json(others);
    }
    catch(err){
            console.log(err);
    }

});


module.exports=router;