const router=require("express").Router();
const Course=require("../models/courses");

router.post("/addcourse",async (req,res)=>{
    try{
        const newCourse=await new Course({
            name:req.body.name
        })  
        const course=await newCourse.save();
        res.status(200).json(course);
    
    }
    catch(err){
        console.log(err);
    } 
    });

    router.get("/courses",async(req,res)=>{
        try{
           
            Course.find({}, function(err, data) {
                if (err) {
                  console.log(err);
                  return res.send(500, 'Something Went wrong with Retrieving data');
                } else {
                 
                  res.json(data);
                }
              });
        }
        catch(err)
        {  console.log("k1");
           res.status(404).json(err);
        }
    });
    
module.exports=router;