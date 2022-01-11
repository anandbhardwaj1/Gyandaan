const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

router.post("/conversation", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/conversations/:userId", async (req, res) => {
  try {
   
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    },null,{ sort :{ createdAt : -1}});
   
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv using conv id
router.get("/conv/:convId",async(req,res)=>{
  try{
    const conversation=await Conversation.findById((req.params.convId));
  
  res.status(200).json(conversation);
  }
  catch (err){
    res.status(500).json(err);
  }
})


// get conv includes two userId


router.get("/conversations/find/:firstUserId/:secondUserId", async (req, res) => {
  try { 
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    
    res.status(500).json(err);
  }
});

module.exports = router;
