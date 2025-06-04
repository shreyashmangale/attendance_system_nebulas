const express = require('express');
const { getTodaysPresentEmployees } = require('../controllers/todaysEmployeeAttendanceController');
const router = express.Router();

router.get('/', getTodaysPresentEmployees);

module.exports = router;
