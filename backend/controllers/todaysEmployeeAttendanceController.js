const { client } = require("../mongodbConnection");

// Assuming you have MongoDB client and collection set up and imported
// e.g. const attendanceCollection = mongoClient.db('yourDB').collection('attendance');

const getTodaysPresentEmployees = async (req, res) => {
    try {
        const db = client.db('employee_attendance_db');
        const collection = db.collection('employee_attendance');


        // Define UTC start of today (midnight UTC)
        const startOfToday = new Date();
        startOfToday.setUTCHours(0, 0, 0, 0);

        // Define UTC end of today (just before midnight UTC next day)
        const endOfToday = new Date();
        endOfToday.setUTCHours(23, 59, 59, 999);

        // Mongo query: find employees with "Present" status
        // and date between start and end of today in UTC
        const todaysPresent = await collection.find({
            attendanceStatus: "Present",
            date: {
                $gte: startOfToday,
                $lte: endOfToday
            }
        }).toArray();

        res.status(200).json(todaysPresent);
    } catch (error) {
        console.error("Error fetching today's present employees:", error);
        res.status(500).json({ message: "Failed to fetch today's present employees" });
    }
};


module.exports = { getTodaysPresentEmployees };
