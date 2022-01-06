const router=require("express").Router();
const Student=require("../models/student");

router.get("/",async(req,res)=>{
    const catName=req.query.cat;
    try{
        let students;
        if(catName){
            students=await Student.find({topics:{
                $in:[catName]
            }})
        }
        else
        {
            students=await Student.find();
        }

        res.status(200).json(students);
    }
    catch(err)
    {
       res.status(404).json(err);
    }
});
router.get("/students/:id", async (req, res) => {
    try {
     
      const student = await Student.findById((req.params.id));
     
      res.status(200).json(student.name);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports=router;