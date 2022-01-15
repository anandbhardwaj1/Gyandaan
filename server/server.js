const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const studentRoute=require("./routes/student");
const bcrypt=require("bcrypt");
dotenv.config();
const URL=process.env.URL;
var cors = require('cors')
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(require("./routes/auth"));
app.use(require("./routes/course"));
app.use(require("./routes/mentor"));
app.use(require("./routes/conversations"));
app.use(require("./routes/messages"));
app.use(require("./routes/student"));
app.use(require("./routes/razorpay"));

mongoose.connect(URL, {useNewUrlParser: true},()=>{
    console.log("Connected");
});

app.listen(8800,()=>{
console.log("backend server");
})