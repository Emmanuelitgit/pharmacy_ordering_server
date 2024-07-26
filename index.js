const mongoose = require("mongoose");
const employeeRoute = require("./routes/empployee")
const authRoute = require("./routes/auth")
const appMiddleware = require("./middleware/middleware")
const medicineRoute = require("./routes/medicine")
const orderRoute = require("./routes/Order")
const dotenv = require("dotenv")
const app = appMiddleware.app
dotenv.config();



// mongoose
//   .connect(process.env.CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("database connected");
//   })
//   .catch(err => {
//     console.log("Could not connect", err);
//   });

mongoose 
 .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.use("/", employeeRoute)
app.use("/", authRoute)
app.use("/", medicineRoute)
app.use("/", orderRoute)


app.listen(5000, ()=>{
  console.log("listening at port 5000..")
})