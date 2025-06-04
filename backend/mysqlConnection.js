const mysql = require('mysql');
const dotenv = require('dotenv').config();

// Create connection
const mysqlClient = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'employeedb'
});


// Connect
mysqlClient.connect((err) => {
  if (err) {
    console.error('Connection failed:', err);
    return;
  }
  //console.log('Connected to MySQL database');
});


module.exports = mysqlClient;