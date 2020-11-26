const mongoose=require("../db/connection");
const Schema=mongoose.Schema;

const userSchema=mongoose.Schema({
    name:{type:String,minlength:5,required:true},
    email:{type:String,unique:1,required:true},
    token: { type: String },
    tokenExp: { type: Number },
    image: { type: String ,required:true},
    contacts: [{ type:Schema.Types.ObjectId , ref:"User"}]
});

const User=mongoose.model("User",userSchema);
module.exports = { User };