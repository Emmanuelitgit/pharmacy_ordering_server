const express = require("express");
const appointmentRoute = require("../controllers/Appointment");
const authToken = require("../middleware/verifyToken");
const uploadPath = require("../middleware/middleware");

const verifyToken = authToken.verifyToken;
const upload = uploadPath.upload;

const router = express.Router();

/**
 * @swagger
 * /appointments/add-appointment:
 *   post:
 *     summary: Add a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointment added successfully
 */
router.post("/add-appointment", verifyToken, appointmentRoute.AddAppointment);

/**
 * @swagger
 * /appointments/update-appointment/{id}:
 *   put:
 *     summary: Update an existing appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 */
router.put("/update-appointment/:id", verifyToken, appointmentRoute.UpdateAppointment);

/**
 * @swagger
 * /appointments/delete-appointment/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 */
router.delete("/delete-appointment/:id", verifyToken, appointmentRoute.DeleteAppointment);

/**
 * @swagger
 * /appointments/all-appointment:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 */
router.get("/all-appointment", verifyToken, appointmentRoute.FetchAllAppointment);

/**
 * @swagger
 * /appointments/single-appointment:
 *   get:
 *     summary: Get a user's appointment by email
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointment details
 */
router.get("/single-appointment", verifyToken, appointmentRoute.FetchAppointmentByUserEmail);

module.exports = router;