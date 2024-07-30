const express = require("express");
const orderRoute = require("../controllers/Order");



const router = express.Router()

router.post("/place-order", orderRoute.PlaceOrder)
router.get("/all-orders", orderRoute.FetchAllOrders)

module.exports = router