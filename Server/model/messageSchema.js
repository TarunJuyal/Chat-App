const mongoose=require("../db/connection");
const Schema=mongoose.Schema;

const messageSchema=mongoose.Schema({
    roomId:{type:Schema.Types.ObjectId, ref:"Room",required:true},
    from:{type:Schema.Types.ObjectId, ref:"User" ,required:true},
    content: { type: String , required:true},
    sentAt: {type: String, required:true}
});

const Message=mongoose.model("Message",messageSchema);
module.exports = { Message };