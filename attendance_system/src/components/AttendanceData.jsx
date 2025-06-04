import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'



const AttendanceData = () => {

    const [employeeAttendanceData, setEmployeeAttendanceData] = useState([]);

    const [employeeAttendanceDataCopy, setEmployeeAttendanceDataCopy] = useState(employeeAttendanceData);

    async function getAllEmployeesData() {
        try {
            const response = await axios.get('http://localhost:8000/employeesattendance');
            if (response.status === 200) {
                console.log(response.data);
                setEmployeeAttendanceData(response.data)
                setEmployeeAttendanceDataCopy(response.data)
            }


        } catch (error) {
            //console.log(error)
        }
    }

    useEffect(() => {
        getAllEmployeesData();
    }, []);





    const [filterType, setFilterType] = useState(""); // dropdown selection
    const [searchEmployee, setSearchEmployee] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
    });
    const [searchDateRange, setSearchDateRange] = useState({
        startDate: "",
        endDate: "",
    });
    const [searchSpecificDate, setSearchSpecificDate] = useState({
        date: "",
    });

    // Handle dropdown change
    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
    };

    // Filter functions (same as your original ones)
    const searchEmployeeDetails = (employeeId, firstName, lastName) => {
        console.log("data 1", employeeId, firstName, lastName)
        return employeeAttendanceData.filter((row) => {
            const matchesEmpID = employeeId ? row.employeeId === employeeId : true;
            const matchesFirstName = firstName ? row.firstName.toLowerCase().includes(firstName.toLowerCase()) : true;
            const matchesLastName = lastName ? row.lastName.toLowerCase().includes(lastName.toLowerCase()) : true;
            console.log("data 2", matchesEmpID, matchesFirstName, matchesLastName)
            return matchesEmpID && matchesFirstName && matchesLastName;
        });
    };

    const filterByDateRange = (startDate, endDate) => {
        const start = new Date(startDate);
        // Set end to the **end of the day** (23:59:59.999)
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        // //console.log(start, end)
        return employeeAttendanceData.filter((row) => {
            const rowDate = new Date(row.date);
            return rowDate >= start && rowDate <= end;
        });
    };

    const filterBySpecificDate = (date) => {
        const selectedDate = new Date(date).setHours(0, 0, 0, 0);
        return employeeAttendanceData.filter((row) => {
            const rowDate = new Date(row.date).setHours(0, 0, 0, 0);
            return rowDate === selectedDate;
        });
    };

    // Unified search handler
    const handleSearch = (e) => {
        e.preventDefault();
        let filteredData = [];

        if (filterType === "employee") {
            const { employeeId, firstName, lastName } = searchEmployee;
            if (!employeeId && !firstName && !lastName) return;
            filteredData = searchEmployeeDetails(employeeId, firstName, lastName);
            //setSearchEmployee({ employeeId: "", firstName: "", lastName: "" });
        } else if (filterType === "dateRange") {
            const { startDate, endDate } = searchDateRange;
            if (!startDate || !endDate) return;
            filteredData = filterByDateRange(startDate, endDate);
            //setSearchDateRange({ startDate: "", endDate: "" });
        } else if (filterType === "specificDate") {
            const { date } = searchSpecificDate;
            if (!date) return;
            filteredData = filterBySpecificDate(date);
            //setSearchSpecificDate({ date: "" });
        }

        if (filteredData.length === 0) {
            alert("No matching records found!");
        }
        console.log(filteredData)
        setEmployeeAttendanceDataCopy(filteredData);
    };




    return (
        <div className='px-4 sm:px-6 lg:px-8 py-6 text-sm bg-gray-100 min-h-screen'>
            <div className='sm:mb-8'>
                <h1 className='text-3xl font-[500] text-[#0061ad] text-start mb-2'>Attendance Details</h1>
                <p className="text-md font-[400] text-[#787878]  text-start pb-[15px]">
                    Here you can view an overview of Everyday's attendance,
                    track employee attendance, and access reports.
                </p>
                <div className='h-[1px] bg-gray-400'></div>
            </div>


            <form
                onSubmit={handleSearch}
                className="max-w-2xl p-6 mt-8 bg-white shadow-xl rounded-2xl space-y-6"
            >
                <h2 className="text-xl font-[500] text-[#0090DA]">Search Employee Attendance</h2>

                {/* Filter Type Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-4">
                        Select Filter Type
                    </label>
                    <div className='flex'>

                        <select
                            value={filterType}
                            onChange={handleFilterTypeChange}
                            className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Choose...</option>
                            <option value="employee">By Employee Info</option>
                            <option value="dateRange">By Date Range</option>
                            <option value="specificDate">By Specific Date</option>
                        </select>
                    </div>
                </div>

                {/* Employee Info Filter */}
                {filterType === "employee" && (
                    <div className="grid md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            name="employeeId"
                            placeholder="Employee ID"
                            value={searchEmployee.employeeId}
                            onChange={(e) =>
                                setSearchEmployee({ ...searchEmployee, [e.target.name]: e.target.value })
                            }
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={searchEmployee.firstName}
                            onChange={(e) =>
                                setSearchEmployee({ ...searchEmployee, [e.target.name]: e.target.value })
                            }
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={searchEmployee.lastName}
                            onChange={(e) =>
                                setSearchEmployee({ ...searchEmployee, [e.target.name]: e.target.value })
                            }
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                {/* Date Range Filter */}
                {filterType === "dateRange" && (
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="date"
                            name="startDate"
                            value={searchDateRange.startDate}
                            onChange={(e) =>
                                setSearchDateRange({ ...searchDateRange, [e.target.name]: e.target.value })
                            }
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="date"
                            name="endDate"
                            value={searchDateRange.endDate}
                            onChange={(e) =>
                                setSearchDateRange({ ...searchDateRange, [e.target.name]: e.target.value })
                            }
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                {/* Specific Date Filter */}
                {filterType === "specificDate" && (
                    <div>
                        <input
                            type="date"
                            name="date"
                            value={searchSpecificDate.date}
                            onChange={(e) =>
                                setSearchSpecificDate({ ...searchSpecificDate, [e.target.name]: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#0090DA] text-white font-medium rounded-lg hover:cursor-pointer transition"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setFilterType("");
                            setSearchEmployee({ employeeId: "", firstName: "", lastName: "" });
                            setSearchDateRange({ startDate: "", endDate: "" });
                            setSearchSpecificDate({ date: "" });
                            setEmployeeAttendanceDataCopy(employeeAttendanceData); // reset
                        }}
                        className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
                    >
                        Reset
                    </button>
                </div>
            </form>




            {/* Table for displaying employee data */}
            <TableContainer component={Paper} className='mt-12 mb-8 max-w-full mx-auto text-xs'>
                <Table sx={{ maxWidth: '100%', margin: 'auto' }} aria-label="simple table">
                    <TableHead className='bg-[#0090DA]'>
                        <TableRow>
                            <TableCell align="center" className='!text-white'>Emp ID</TableCell>
                            <TableCell align="center" className='!text-white'>First Name</TableCell>
                            <TableCell align="center" className='!text-white'>Last Name</TableCell>
                            <TableCell align="center" className='!text-white'>Date</TableCell>
                            <TableCell align="center" className='!text-white'>Attendance Status</TableCell>
                        </TableRow>
                    </TableHead>
                    {employeeAttendanceDataCopy.length > 0 && (
                        <TableBody>
                            {employeeAttendanceDataCopy.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {row.employeeId}
                                    </TableCell>
                                    <TableCell align="center">{row.firstName}</TableCell>
                                    <TableCell align="center">{row.lastName}</TableCell>
                                    <TableCell align="center">{new Date(row.date).toLocaleDateString('en-CA')}</TableCell>
                                    <TableCell align="center">{row.attendanceStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        )
                    }
                </Table>
                {
                    employeeAttendanceDataCopy.length === 0 && (
                        <div className='flex justify-center items-center p-4 w-full text-center'>
                            <p className='sm:text-xl text-md text-[#ff0000]'>No Matching Attendance Records Found</p>
                        </div>
                    )
                }
            </TableContainer>
        </div>
    );
}

export default AttendanceData;