const medicineRoute = require("../controllers/medicine");
const express = require("express");
const authenticateToken = require("../middleware/authToken")
const uploadPath = require("../middleware/middleware")
const upload = uploadPath.upload
const authenticate = authenticateToken.authenticateToken;

const router = express.Router();

router.post("/add-medicine", upload.single("file"), medicineRoute.AddMedicine);
router.put("/update-medicine/:id", medicineRoute.UpdateMedicine);
router.delete("/delete-medicine/:id", medicineRoute.DeleteMedicine);
router.get("/all-medicine", medicineRoute.FetchAllMedicine);
router.get("/single-medicine/:id", medicineRoute.FetchSingleMedicine);


module.exports = router;