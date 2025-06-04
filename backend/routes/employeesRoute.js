const express = require('express')
const { getAllEmployees, addEmployee } = require('../controllers/employeesController')

const router = express.Router()

router.get("/", getAllEmployees)
router.post("/", addEmployee)


module.exports = router