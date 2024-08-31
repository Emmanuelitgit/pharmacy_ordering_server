const express = require("express");
const orderRoute = require("../controllers/Order");
const authToken = require("../middleware/verifyToken");
const verifyToken = authToken.verifyToken


const router = express.Router()

router.post("/place-order/:id", verifyToken, orderRoute.PlaceOrder)
router.get("/all-orders", verifyToken, orderRoute.FetchAllOrders)
router.get("/user-orders", verifyToken, orderRoute.FetchAllOrder)


module.exports = router