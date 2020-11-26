const express=require("express");
const { Message }=require("../model/messageSchema");
const messageRoutes=express.Router();

messageRoutes.post("/save", (req, res) => {
    const {roomId, from, content, sentAt}=req.body;
    const message=new Message({roomId, from, content, sentAt });
    message.save((err,doc)=>{
        if(err) return res.json({success:false, err});
        return res.status(200).json({success:true, messageData:doc});
    })
});

messageRoutes.post("/getMessages", (req, res) => {
    const { roomId }=req.body;
    Message.find({ roomId }).populate("from").exec((err,messages)=>{
        if(err) return res.json({success:false, err});
        return res.status(200).json({success:true, messages});
    })
});

module.exports = messageRoutes;