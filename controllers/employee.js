const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ error: "Internal server error" });
    }
}

const createEmployee = async (req, res) => {
  try {
    const { name, age, GPA } = req.body;

    const newEmployee = new Employee({
      name,
      age,
      GPA,
    });

    await newEmployee.save();

    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, age, GPA } = req.body;
  
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { name, age, GPA },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedEmployee = await Employee.findByIdAndDelete(id);
  
      if (!deletedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = { getEmployees, createEmployee, updateEmployee, deleteEmployee };
