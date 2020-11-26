const mongoose=require("../db/connection");

const userSchema=mongoose.Schema({
    name:{type:String,minlength:5,required:true},
    email:{type:String,unique:1,required:true},
    token: { type: String },
    tokenExp: { type: Number },
    image: { type: String ,required:true},
});

const User=mongoose.model("User",userSchema);
module.exports = { User };