const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");

const studentRoute=require("./routes/student");
const bcrypt=require("bcrypt");
const URL="mongodb+srv://Anand:12345678A@cluster0.zgvw0.mongodb.net/Authentication?retryWrites=true&w=majority"
dotenv.config();

var cors = require('cors')

app.use(cors())

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(require("./routes/auth"));



mongoose.connect(URL, {useNewUrlParser: true},()=>{
    console.log("Connected");
});

app.listen(8800,()=>{
console.log("backend server");
})