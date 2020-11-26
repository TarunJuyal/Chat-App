const mongoose=require("../db/connection");
const Schema=mongoose.Schema;

const roomSchema=mongoose.Schema({
    name:{type:String,minlength:5,required:true},
    madeBy:{type:Schema.Types.ObjectId, ref:"User"},
    members: [{ type:Schema.Types.ObjectId , ref:"User"}]
});

const Room=mongoose.model("Room",roomSchema);
module.exports = { Room };