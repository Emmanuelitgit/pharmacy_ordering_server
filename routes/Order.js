const express = require("express");
const orderRoute = require("../controllers/Order");
const authToken = require("../middleware/verifyToken");
const verifyToken = authToken.verifyToken;

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */

/**
 * @swagger
 * /place-order/{id}:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product being ordered
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *               shipping_address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order placed successfully
 */
router.post("/place-order/:id", verifyToken, orderRoute.PlaceOrder);

/**
 * @swagger
 * /all-orders:
 *   get:
 *     summary: Fetch all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all orders
 */
router.get("/all-orders", verifyToken, orderRoute.FetchAllOrders);

/**
 * @swagger
 * /user-orders:
 *   get:
 *     summary: Fetch orders by user email
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders for the authenticated user
 */
router.get("/user-orders", verifyToken, orderRoute.FetchOrderByUserEmail);

module.exports = router;