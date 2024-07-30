const express = require("express");
const authRoute = require("../controllers/auth")
const uploadPath = require("../middleware/middleware")
const upload = uploadPath.upload

const router = express.Router()

router.post("/register", upload.single("file"), authRoute.Register)
router.post("/login", authRoute.Login)
router.post("/verify-otp/:id", authRoute.verifyOtp)
router.post("/renew-token", authRoute.renewToken);

module.exports = router