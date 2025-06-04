import React, { useEffect, useState } from 'react';
import axios from 'axios'

const AttendanceDashboard = () => {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [presentEmployees, setPresentEmployees] = useState(0);

    const [percentage, setPercentage] = useState(0);


    useEffect(() => {
        const getTotalEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8000/employeesdata'); // replace with actual endpoint
                if (response.status === 200) {
                    setTotalEmployees(response.data.length);
                }
            } catch (error) {
                console.error('Error fetching total employees', error);
            }
        };

        const getTodaysPresentEmployee = async () => {
            try {
                const response = await axios.get('http://localhost:8000/employeeattendance/today-present'); // replace with actual endpoint
                if (response.status === 200) {
                    setPresentEmployees(response.data.length);
                }
            } catch (error) {
                console.error('Error fetching present employees', error);
            }
        };

        // Run both fetches
        getTotalEmployees();
        getTodaysPresentEmployee();
    }, []); // Run only on mount

    // Calculate percentage when data is updated
    useEffect(() => {
        if (totalEmployees > 0) {
            const pct = ((presentEmployees / totalEmployees) * 100).toFixed(2);
            setPercentage(pct);
        } else {
            setPercentage(0);
        }
    }, [presentEmployees, totalEmployees]);





    return (
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 bg-gray-100 min-h-screen">
            {/* Title and Introduction */}
            <div className="mb-6">
                <h1 className="text-3xl font-[500] text-[#0061ad] text-start mb-2">Attendance Dashboard</h1>
                <p className="text-md font-[400] text-[#787878] text-start pb-[15px]">
                    Welcome to the Attendance Dashboard. Here you can view an overview of today's attendance,
                    track employee attendance, and access reports.
                </p>
                <div className='h-[1px] bg-gray-400'></div>
            </div>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-center">
                <div className="bg-white sm:p-6 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-[500] mb-2">Total Employees</h3>
                    <p className="text-3xl text-black">{totalEmployees}</p>
                </div>
                <div className="bg-white sm:p-6 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-[500] mb-2">Total Present</h3>
                    <p className="text-3xl text-green-600">{presentEmployees}</p>
                </div>
                <div className="bg-white sm:p-6 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-[500] mb-2">Total Absent</h3>
                    <p className="text-3xl text-red-600">{totalEmployees - presentEmployees}</p>
                </div>
                <div className="bg-white sm:p-6 p-4 rounded-lg shadow-lg">
                    <h3 className="text-xl font-[500] mb-2">Total Attendance</h3>
                    <p className="text-3xl text-black">{percentage}%</p>
                </div>
            </div>

        </main>
    );
};

export default AttendanceDashboard;
