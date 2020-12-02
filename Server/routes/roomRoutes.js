const express=require("express");
const { User }=require("../model/userModel");
const { Room }=require("../model/roomSchema");
const roomRoutes=express.Router();

roomRoutes.post("/createContact", (req, res) => {
    const { userId, name,  email }=req.body;
    User.findOne({ email }).exec((err,newContact)=>{
        if(err) return res.status(400).send(err);
        if(!newContact) return res.json({success:false, message:"User doesn't exists !!"});
        User.findOne({ _id:userId }).exec((err,user)=>{
            if(err) return res.status(500).send(err);
            if(user._id.equals(newContact._id)) return res.json({success:false, message:"Cannot add yourself"});
            if(user.contacts.indexOf(newContact._id)===-1){ 
            let members=[user,newContact];
            const room=new Room({ name, madeBy:userId,members });
            room.save((err,roomDetail)=>{
                if(err) return res.json({success:false, err});
                user.contacts=[...user.contacts,newContact._id];
                user.save((err,doc)=>{
                if(err) return res.json({success:false, err});
                })
                return res.status(200).json({success: true, roomDetail})
            })
            }else{
                return res.status(200).json({success:false, message:"Contact already exists !!"})
            }
         })    
    })
});

roomRoutes.post("/getRooms", (req, res) => {
    const { userId }=req.body;
    Room.find({ members: {$elemMatch:{$eq:userId}}}).populate("members").exec((err,roomDetail)=>{
        if(err) return res.json({success:false, err});
        return res.status(200).json({success:true, roomDetail});
    })
});

roomRoutes.post("/getRoomDetails", (req, res) => {
    const { roomId }=req.body;
    Room.find({ _id:roomId }).populate("members").exec((err,room)=>{
        if(err) return res.json({success:false, err});
        return res.status(200).json({success:true, room});
    })
});

module.exports = roomRoutes;    