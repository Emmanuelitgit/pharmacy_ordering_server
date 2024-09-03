const appointmentRoute = require("../controllers/Appointment");
const express = require("express");
const authToken = require("../middleware/verifyToken")
const verifyToken = authToken.verifyToken
const uploadPath = require("../middleware/middleware")
const upload = uploadPath.upload

const router = express.Router();

router.post("/add-appointment", verifyToken, appointmentRoute.AddAppointment);
router.put("/update-appointment/:id", verifyToken, appointmentRoute.UpdateAppointment);
router.delete("/delete-appointment/:id", verifyToken, appointmentRoute.DeleteAppointment);
router.get("/all-appointment", verifyToken, appointmentRoute.FetchAllAppointment);
router.get("/single-appointment", verifyToken, appointmentRoute.FetchSingleAppointment);


module.exports = router;