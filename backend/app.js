const express = require('express')
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const mysqlClient = require('./mysqlConnection')
const mongodbClient = require('./mongodbConnection')
const employeesRoute = require('./routes/employeesRoute')
const employeeAttendanceRoute = require('./routes/employeeAttendanceRoute')
const todaysEmployeeAttendance = require('./routes/todaysEmployeeAttendanceRoute')

app.use(express.json());
app.use(cors())

app.get('/', (req,res)=>{
    res.status(200).json({message: "Home page hit"})
})

app.use('/employeesdata', employeesRoute);
app.use('/employeesattendance', employeeAttendanceRoute);
app.use('/employeeattendance/today-present', todaysEmployeeAttendance);


module.exports = app;