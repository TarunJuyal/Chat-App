const express=require("express");
const { User }=require("../model/userModel");
const { Room }=require("../model/roomSchema");
const roomRoutes=express.Router();

roomRoutes.post("/createContact", (req, res) => {
    const { userId, name,  email }=req.body;
    User.findOne({ email }).exec((err,newContact)=>{
        if(err) return res.status(500).send(err);
        User.findOne({ _id:userId }).exec((err,user)=>{
            if(err) return res.status(500).send(err);
            if(user.contacts.indexOf(newContact._id)===-1){ 
            user.contacts=[...user.contacts,newContact._id];
            user.save((err,doc)=>{
                if(err) return res.json({success:false, err});
            })
            let members=[user,newContact];
            const room=new Room({ name, madeBy:userId,members });
            room.save((err,roomDetail)=>{
                if(err) return res.json({success:false, err});
                return res.status(200).json({success: true, roomDetail})
            })
            }else{
                return res.status(200).json({success:false, message:"Contact already exists !!"})
            }
         })    
    })
});

roomRoutes.post("/getRoomDetails", (req, res) => {
    const { userId }=req.body;
    Room.find({ madeBy:userId }).populate("members").exec((err,roomDetail)=>{
        if(err) return res.json({success:false, err});
        return res.status(200).json({success:true, roomDetail});
    })
});

module.exports = roomRoutes;    