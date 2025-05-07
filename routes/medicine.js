const medicineRoute = require("../controllers/medicine");
const express = require("express");
const authToken = require("../middleware/verifyToken");
const verifyToken = authToken.verifyToken;
const uploadPath = require("../middleware/middleware");
const upload = uploadPath.upload;

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: API for managing medicines
 */

/**
 * @swagger
 * /add-medicine:
 *   post:
 *     summary: Add a new medicine
 *     tags: [Medicines]
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
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medicine added successfully
 */
router.post("/add-medicine", upload.single("file"), medicineRoute.AddMedicine);

/**
 * @swagger
 * /update-medicine/{id}:
 *   put:
 *     summary: Update a medicine by ID
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medicine ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Medicine updated successfully
 */
router.put("/update-medicine/:id", verifyToken, medicineRoute.UpdateMedicine);

/**
 * @swagger
 * /delete-medicine/{id}:
 *   delete:
 *     summary: Delete a medicine by ID
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medicine ID
 *     responses:
 *       200:
 *         description: Medicine deleted successfully
 */
router.delete("/delete-medicine/:id", verifyToken, medicineRoute.DeleteMedicine);

/**
 * @swagger
 * /all-medicine:
 *   get:
 *     summary: Get all medicines
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of medicines
 */
router.get("/all-medicine", verifyToken, medicineRoute.FetchAllMedicine);

/**
 * @swagger
 * /single-medicine/{id}:
 *   get:
 *     summary: Get a single medicine by ID
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medicine ID
 *     responses:
 *       200:
 *         description: Medicine details
 */
router.get("/single-medicine/:id", verifyToken, medicineRoute.FetchSingleMedicine);

module.exports = router;