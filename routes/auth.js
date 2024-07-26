const express = require("express");
const authRoute = require("../controllers/auth")
const authenticateToken = require("../middleware/authToken")
const uploadPath = require("../middleware/middleware")
const upload = uploadPath.upload

const router = express.Router()

router.post("/register", upload.single("file"), authRoute.Register)
router.post("/login", authRoute.Login)

module.exports = router