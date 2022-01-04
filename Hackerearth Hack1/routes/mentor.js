const router=require("express").Router();
const Mentor=require("../models/mentor");
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser");
router.use(cookieParser());
router.use(bodyParser.json());

router.post("/addMentor",async (req,res)=>{
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

    router.post("/mentors",async(req,res)=>{
        try{ console.log("k");
           const topic=req.body.topic;
            Mentor.find({topics:topic}, function(err, data) {
                if (err) {
                  console.log(err);
                  return res.send(500, 'Something Went wrong with Retrieving data');
                } else {
                   console.log(data);
                  res.json(data);
                }
              });
        }
        catch(err)
        {   console.log("k1");
           res.status(405).json(err);
        }
    });
    
module.exports=router;