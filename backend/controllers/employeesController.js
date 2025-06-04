const db = require('../mysqlConnection.js');

// Add a new employee
const addEmployee = (req, res) => {
  // const { firstname, lastname } = req.body;
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;


  // if (!firstname || !lastname) {
  //   return res.status(400).json({ message: ' Firstname and lastname are required' });
  // }

  const sql = 'INSERT INTO employees (firstName, lastName) VALUES (?, ?)';
  db.query(sql, [ firstname, lastname], (err, result) => {
    if (err) {
      console.error('Error inserting employee:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    //console.log("successfull")
    res.status(201).json({ message: 'Employee added successfully', insertId: result.insertId });
  });
};

// Get all employees
const getAllEmployees = (req, res) => {
  //console.log("visited get employee")
  const sql = 'SELECT * FROM employees';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    //console.log(results)
    res.status(200).json(results);
  });
};

module.exports = {
  addEmployee,
  getAllEmployees,
};
