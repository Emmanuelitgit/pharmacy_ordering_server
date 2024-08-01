const medicineRoute = require("../controllers/medicine");
const express = require("express");
const authToken = require("../middleware/verifyToken")
const verifyToken = authToken.verifyToken
const uploadPath = require("../middleware/middleware")
const upload = uploadPath.upload

const router = express.Router();

router.post("/add-medicine", upload.single("file"), medicineRoute.AddMedicine);
router.put("/update-medicine/:id", verifyToken, medicineRoute.UpdateMedicine);
router.delete("/delete-medicine/:id", verifyToken, medicineRoute.DeleteMedicine);
router.get("/all-medicine", verifyToken, medicineRoute.FetchAllMedicine);
router.get("/single-medicine/:id", verifyToken, medicineRoute.FetchSingleMedicine);


module.exports = router;