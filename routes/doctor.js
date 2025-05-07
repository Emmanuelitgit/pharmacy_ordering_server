const doctorRoute = require("../controllers/Doctor");
const express = require("express");
const authToken = require("../middleware/verifyToken");
const verifyToken = authToken.verifyToken;
const uploadPath = require("../middleware/middleware");
const upload = uploadPath.upload;

const router = express.Router();

/**
 * @swagger
 * /doctor/add-doctor:
 *   post:
 *     summary: Add a new doctor
 *     tags: [Doctor]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               biography:
 *                 type: string
 *               experience:
 *                 type: string
 *               fee:
 *                 type: number
 *     responses:
 *       201:
 *         description: Doctor added successfully
 */
router.post("/add-doctor", upload.single("file"), doctorRoute.AddDoctor);

/**
 * @swagger
 * /doctor/update-doctor/{id}:
 *   put:
 *     summary: Update an existing doctor's details
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               biography:
 *                 type: string
 *               experience:
 *                 type: string
 *               fee:
 *                 type: number
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 */
router.put("/update-doctor/:id", verifyToken, doctorRoute.UpdateDoctor);

/**
 * @swagger
 * /doctor/delete-doctor/{id}:
 *   delete:
 *     summary: Delete a doctor by ID
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 */
router.delete("/delete-doctor/:id", verifyToken, doctorRoute.DeleteDoctor);

/**
 * @swagger
 * /doctor/all-doctor:
 *   get:
 *     summary: Fetch all doctors
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of doctors retrieved successfully
 */
router.get("/all-doctor", verifyToken, doctorRoute.FetchAllDoctor);

/**
 * @swagger
 * /doctor/single-doctor/{id}:
 *   get:
 *     summary: Fetch a single doctor by ID
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor details retrieved successfully
 */
router.get("/single-doctor/:id", verifyToken, doctorRoute.FetchDoctorById);

module.exports = router;