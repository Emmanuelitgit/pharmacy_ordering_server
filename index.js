const mongoose = require("mongoose");
const employeeRoute = require("./routes/empployee")
const authRoute = require("./routes/auth")
const appMiddleware = require("./middleware/middleware")
const medicineRoute = require("./routes/medicine")
const app = appMiddleware.app;

mongoose
  .connect("mongodb://localhost:27017/pharmacy_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("database connected");
  })
  .catch(err => {
    console.log("Could not connect", err);
  });


app.use("/", employeeRoute)
app.use("/", authRoute)
app.use("/", medicineRoute)


app.listen(5000, ()=>{
  console.log("listening at port 5000..")
})