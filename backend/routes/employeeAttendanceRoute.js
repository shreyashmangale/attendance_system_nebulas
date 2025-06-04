const express = require('express')
const { getAllEmployeeAttendance, addEmployeeAttendance } = require('../controllers/employeeAttendanceController')

const router = express.Router()

router.get("/", getAllEmployeeAttendance)
router.post("/", addEmployeeAttendance)


module.exports = router