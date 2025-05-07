const express = require("express");
const authRoute = require("../controllers/auth");
const uploadPath = require("../middleware/middleware");
const upload = uploadPath.upload;

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", upload.single("file"), authRoute.Register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", authRoute.Login);

/**
 * @swagger
 * /verify-otp/{id}:
 *   post:
 *     summary: Verify OTP using user ID
 *     tags: [Auth]
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
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */
router.post("/verify-otp/:id", authRoute.verifyOtp);

/**
 * @swagger
 * /auth/renew-token:
 *   post:
 *     summary: Renew authentication token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Token renewed successfully
 */
router.post("/renew-token", authRoute.renewToken);

/**
 * @swagger
 * /auth/payment:
 *   post:
 *     summary: Initialize payment with Paystack
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Payment initialized
 */
router.post("/payment", authRoute.initializePayment);

/**
 * @swagger
 * /auth/verify-payment/{reference}:
 *   get:
 *     summary: Verify payment using reference
 *     tags: [Auth]
 *     parameters:
 *       - name: reference
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment verified
 */
router.get("/verify-payment/:reference", authRoute.verifyPayment);

module.exports = router;