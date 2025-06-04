const { client } = require("../mongodbConnection");
const db = require('../mysqlConnection.js');


const addEmployeeAttendance = async (req, res) => {

    const { employeeId, firstName, lastName, date, attendanceStatus } = req.body;
    console.log(req.body)

    // ✅ Step 1: Validate employee from MySQL
    const sql = 'SELECT * FROM employees WHERE employeeId = ? AND firstname = ? AND lastname = ?';
    db.query(sql, [employeeId, firstName, lastName], async (err, rows) => {
        if (err) {
            console.error('MySQL Error:', err);
            return res.status(500).json({ message: 'MySQL error' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        try {
            const db = client.db('employee_attendance_db');
            const collection = db.collection('employee_attendance');


            // ✅ Step 2: Check if attendance already marked today in MongoDB
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const alreadyMarked = await collection.findOne({
                employeeId,
                date: { $gte: today }
            });
            console.log("alreadyMarked", alreadyMarked)

            if (alreadyMarked) {
                return res.status(400).json({ message: 'Attendance already marked today' });
            }

            // ✅ Step 3: Insert attendance
            const attendanceData = {
                employeeId,
                firstName,
                lastName,
                date: new Date(),
                attendanceStatus
            };



            await collection.insertOne(attendanceData);
            return res.status(201).json({ message: 'Attendance marked successfully' });

        } catch (error) {
            //   console.error('MongoDB Error:', mongoError);
            //   return res.status(500).json({ message: 'MongoDB error' });
        }
    });


}



const getAllEmployeeAttendance = async (req, res) => {

    try {
        await client.connect();
        const db = client.db('employee_attendance_db');
        const collection = db.collection('employee_attendance');

        const result = await collection.find().toArray();
        //console.log(result);
        return res.status(200).json(result)
    } catch (error) {
        throw error;
    }
}



module.exports = { addEmployeeAttendance, getAllEmployeeAttendance }