const express = require("express");
const orderRoute = require("../controllers/Order");
const authenticateToken = require("../middleware/verifyToken");
const authenticate = authenticateToken.authenticateToken;


const router = express.Router()

router.post("/place-order", authenticate, orderRoute.PlaceOrder)
router.get("/all-orders", authenticate, orderRoute.FetchAllOrders)

module.exports = router