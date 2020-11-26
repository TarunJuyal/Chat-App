const express=require("express");
const { User }=require("../model/userModel");
const { auth }=require("../middleware/auth");
const jwt=require("jsonwebtoken");

const userRoutes=express.Router();

userRoutes.post("/login", (req, res) => {
  User.find({ email: req.body.email }, async (err, user) => {
    if(err) return res.status(400).send(err);
    let newUser=user[0];
     if (!newUser) {
      newUser=new User({name:req.body.name,email:req.body.email,image:req.body.image});
      await newUser.save((err,result)=>{
          if(err) return res.json({success:false,err});
      })
    }      
      let token=jwt.sign(newUser._id.toHexString(), "secret");
      let tokenExp=req.body.tokenExp;
      User.updateOne({_id:newUser._id},{token:token,tokenExp:tokenExp}).exec((err,user)=>{
          if(err) return res.status(400).send(err);
          res.cookie("user_authExp",tokenExp);
          res
            .cookie("user_auth",token)
            .status(200)
            .json({ success: true, userId: newUser._id });
      })
  });
});

userRoutes.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    image: req.user.image,
  });
});

userRoutes.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = userRoutes;