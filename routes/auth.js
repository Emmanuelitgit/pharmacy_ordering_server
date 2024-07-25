const express = require("express");
const authRoute = require("../controllers/auth")
const authenticateToken = require("../middleware/authToken")

const router = express.Router()

router.post("/register", authRoute.Register)
router.post("/login", authRoute.Login)

module.exports = router