const express = require("express");
const employeeControllers = require("../controllers/employee");

const router = express.Router();

router.get("/employees", employeeControllers.getEmployees);
router.post("/create", employeeControllers.createEmployee);
router.put("/update", employeeControllers.updateEmployee);
router.put("/delete", employeeControllers.deleteEmployee);


module.exports = router;