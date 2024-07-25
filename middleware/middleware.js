const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const cookieParser = require("cookie-parser")



const app = express();

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

module.exports =  {app}