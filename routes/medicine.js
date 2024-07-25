const medicineRoute = require("../controllers/medicine");
const express = require("express");
const authenticateToken = require("../middleware/authToken")

const authenticate = authenticateToken.authenticateToken;

const router = express.Router();

router.post("/add-medicine", authenticate, medicineRoute.AddMedicine);
router.put("/update-medicine/:id", authenticate, medicineRoute.UpdateMedicine);
router.delete("/delete-medicine/:id", authenticate, medicineRoute.DeleteMedicine);
router.get("/all-medicine", authenticate, medicineRoute.FetchAllMedicine);
router.get("/single-medicine/:id", authenticate, medicineRoute.FetchSingleMedicine);


module.exports = router;