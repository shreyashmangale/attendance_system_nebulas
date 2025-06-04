// src/components/AttendanceForm.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { isSameDay, isYesterday, isToday } from "date-fns";
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";

export default function AttendanceForm() {

    const [formData, setFormData] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        date: new Date(), // Default to today
        attendanceStatus: ""
    });



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, date });
    };

    const isSelectableDate = (date) => {
        return isToday(date);
    };


    const handleSubmit = async (e) => {
        //console.log(formData)
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/employeesattendance', formData);
            if (response.status === 201) {
                //console.log(response.data);
                // alert("Attendance Submitted Successfully!");

                setFormData({
                    employeeId: "",
                    firstName: "",
                    lastName: "",
                    date: new Date(), // Default to today
                    attendanceStatus: ""
                })
                toast.success("Attendance Submitted Successfully!")

            }
        } catch (error) {
            if (error.response.status === 400) {
                // Backend error with status code (like 404, 500)
                // console.error('Error:', error);
                // //console.log(error.response.status)
                toast.error("Attendance Already Marked for Today!!")
                // alert("Already Marked Attendance")
            } else if (error.response.status === 404) {
                // Network error or unknown
                toast.error("Employee Not Found or Invalid Details!!")
                //alert('Something went wrong. Please try again.');
            }
        }
    };



    return (
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className='sm:mb-8'>
                <h1 className='text-3xl font-[500] text-[#0061ad] text-start mb-2'>Employee Attendance Form</h1>
                <p className="text-md font-[400] text-[#787878]  text-start pb-[15px]">
                    Fill in the attendance details to record an employee's presence for the selected date.
                </p>
                <div className='h-[1px] bg-gray-400'></div>
            </div>
            <div className="max-w-5xl mt-10 bg-white shadow-xl rounded-2xl px-6 sm:pt-10 pt-4 sm:pb-18 pb-8">
                <h2 className="sm:text-2xl text-xl font-bold text-[#0090DA] mb-6 text-start">Mark Employee Attendance</h2>
                <form onSubmit={handleSubmit} className="sm:space-y-8 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter First Name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter Last Name"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                            <input
                                type="text"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter Employee ID"
                            />
                        </div>
                        <div className="!w-full">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <DatePicker
                                selected={formData.date}
                                onChange={handleDateChange}
                                filterDate={isSelectableDate}
                                maxDate={new Date()}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select Date"
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                popperPlacement="bottom-start"
                                popperClassName="react-datepicker-left"
                                calendarClassName="!z-50 !bg-white !rounded-lg !shadow-lg !p-2"
                                sx={{ width: '100%' }}
                            />
                        </div>
                    </div>
                    <div className="flex gap-6 mt-2">
                        <p>Select Status : </p>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.attendanceStatus === "Present"}
                                onChange={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        attendanceStatus: prev.attendanceStatus === "Present" ? "" : "Present",
                                    }))
                                }
                                className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span>Present</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.attendanceStatus === "Absent"}
                                onChange={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        attendanceStatus: prev.attendanceStatus === "Absent" ? "" : "Absent",
                                    }))
                                }
                                className="h-5 w-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            <span>Absent</span>
                        </label>
                    </div>




                    <div className="flex justify-end items-center">

                        <button
                            type="submit"
                            className="w-fit bg-[#a3ce4e] text-white font-semibold  px-4 py-2 rounded-lg hover:cursor-pointer transition duration-300"
                        >
                            Submit Attendance
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
