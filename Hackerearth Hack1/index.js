const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const cookieParser = require("cookie-parser");
const studentRoute=require("./routes/student");
const bcrypt=require("bcrypt");
const URL="mongodb+srv://Anand:12345678A@cluster0.zgvw0.mongodb.net/Authentication?retryWrites=true&w=majority"
dotenv.config();

var cors = require('cors')
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

app.use(cookieParser());

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(require("./routes/auth"));
app.use(require("./routes/course"));
app.use(require("./routes/mentor"));


mongoose.connect(URL, {useNewUrlParser: true},()=>{
    console.log("Connected");
});

app.listen(8800,()=>{
console.log("backend server");
})