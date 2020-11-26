const mongoose=require("mongoose");
require("dotenv").config();

const db=mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
},(err)=>{
    if (err) {
      console.log("Can't connect to database");
    } else {
      console.log("Connection created...");
    }
})

module.exports = mongoose;