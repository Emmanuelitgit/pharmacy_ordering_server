const doctorRoute = require("../controllers/Doctor");
const express = require("express");
const authToken = require("../middleware/verifyToken")
const verifyToken = authToken.verifyToken
const uploadPath = require("../middleware/middleware")
const upload = uploadPath.upload

const router = express.Router();

router.post("/add-doctor", upload.single("file"), doctorRoute.AddDoctor);
router.put("/update-doctor/:id", verifyToken, doctorRoute.UpdateDoctor);
router.delete("/delete-doctor/:id", verifyToken, doctorRoute.DeleteDoctor);
router.get("/all-doctor", verifyToken, doctorRoute.FetchAllDoctor);
router.get("/single-doctor/:id", verifyToken, doctorRoute.FetchSingleDoctor);


module.exports = router;