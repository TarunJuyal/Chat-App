const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const cookieParser=require("cookie-parser");
require("dotenv").config();

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/api/users", require("./routes/userRoutes"));

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})
