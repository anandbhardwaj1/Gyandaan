const router=require("express").Router();
const cookieParser=require("cookie-parser");
const { userInfo } = require("os");
const Student=require("../models/student");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
router.use(cookieParser());

const authorize=(req,res,next)=>{
const token =req.cookies.token;

if(!token)
{
   return  res.status(404).json("Token needed");
   next();
}
else
{
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err)
      { 
          return  res.json({msg:"Failed"});
       }
        else
        {
            req.email=decoded.email;
            console.log(req.email);
           return next();
        }
       
    })
}
}

router.post("/register",async (req,res)=>{
try{
    
    if(!req.body.name||!req.body.email||!req.body.password)
    {
        return res.status(422).json({error:"All fields are required!"});
    }
    const userexist= await Student.findOne({email:req.body.email});
  if(userexist)
  {
      return res.status(401).json({error:"Email Already Registered"});
  }
    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(req.body.password,salt);
    const newStudent=await new Student({
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
        password:hashed
    
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
        const student=await Student.findOne({email:req.body.email});
       
        if(!student)
        res.status(403).json("User not found");
        const validPassword=await bcrypt.compare(req.body.password,student.password);
        if(!validPassword)
        res.status(401).json("Invalid Credentials");

        const{password, ...others}=student._doc;
        
                const email=others.email;
        const token=jwt.sign({email},process.env.ACCESS_TOKEN_SECRET);

        res.cookie('token', token, {expires: new Date(Date.now() + 1000000),httpOnly:true});

        res.status(200).json({token:token,data:others});
    }
    catch(err){
            console.log(err);
    }

});


router.post('/logout',async (req,res)=>{
    try{
        res.clearCookie('token');
  
  res.status(200).json('User Logged out')
    }
    catch(err){
            console.log(err);
    }

});


router.get("/studentprofile",authorize,async(req,res)=>{

    try{
        const student=await Student.findOne({email:req.email});
        
        if(!student)
        res.status(403).json("User not found");
        else
        {
            const{password, ...others}=student._doc;
            res.status(200).json(others);
        }
    }
    catch(err){
            console.log(err);
    }
})


module.exports=router;