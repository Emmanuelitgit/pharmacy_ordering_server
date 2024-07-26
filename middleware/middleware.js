const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const cookieParser = require("cookie-parser")
const multer = require("multer")



const app = express();

const corsOptions ={
  origin:'http://localhost:8081', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname);;
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + file?.originalname);
  }
});

const upload = multer({ storage });


module.exports =  {app, upload}