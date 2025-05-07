const mongoose = require("mongoose");
const employeeRoute = require("./routes/empployee")
const authRoute = require("./routes/auth")
const appMiddleware = require("./middleware/middleware")
const medicineRoute = require("./routes/medicine")
const orderRoute = require("./routes/Order")
const appointmentRoute = require("./routes/appointment")
const doctorRoute = require("./routes/doctor")
const dotenv = require("dotenv")
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./middleware/swagger");
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
        serverSelectionTimeoutMS: 60000 })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));


app.use("/", employeeRoute)
app.use("/", authRoute)
app.use("/", medicineRoute)
app.use("/", orderRoute)
app.use("/", appointmentRoute)
app.use("/", doctorRoute)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.listen(3000, ()=>{
  console.log("listening at port 3000..")
})