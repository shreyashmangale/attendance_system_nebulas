import React, { useEffect, useState } from "react";
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import { addEmployee } from "../apiConfig";

export default function EmployeeTable() {

  const [employees, setEmployees] = useState([]);
  const [employeeAttendanceLoading, setEmployeeAttendanceLoading] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };


  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const { firstName, lastName } = newEmployee;
    if (!firstName || !lastName) return;

    try {
      const response = await axios.post(addEmployee, { firstName, lastName });
      if (response.status === 201) {
        //console.log(response.data);
        toast.success(`Successfully Created New Employee!`)
        getAllEmployees();
        setNewEmployee({ firstName: "", lastName: "" });
      }


    } catch (error) {
      if (error.status === 409) {
        //console.log("Employee Already Exists!!");

      }

    }
  };
  const getAllEmployees = async (e) => {

    try {
      setEmployeeAttendanceLoading(true);
      const response = await axios.get('http://localhost:8000/employeesdata');
      if (response.status === 200) {
        //console.log(response.data);
        setEmployees(response.data)
        setEmployeeAttendanceLoading(false)
      }


    } catch (error) {
      //console.log(error)
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, [])


  const [activeTab, setActiveTab] = useState("tab1");


  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-100 min-h-screen">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <h1 className="text-3xl font-[500] text-[#0061ad] text-start mb-2">Employee Directory</h1>
      <p className="text-md font-[400] text-[#787878]  text-start pb-[15px]">Manage and view all registered employee records in one place.</p>
      <div className='h-[1px] bg-gray-400'></div>


      <div className="w-full max-w-6xl mt-6 py-4">
        {/* Tabs Header */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("tab1")}
            className={`py-2 px-4 border border-blue-100 sm:text-md text-sm font-medium rounded-t-md focus:outline-none transition-all duration-200 ${activeTab === "tab1"
              ? "text-white bg-[#0090DA]"
              : "text-gray-600 hover:text-[#0090DA] bg-gray-100"
              }`}
          >
            Create New Employee
          </button>
          <button
            onClick={() => setActiveTab("tab2")}
            className={`ml-2 py-2 px-4 border border-blue-100 sm:text-md text-sm font-medium rounded-t-md focus:outline-none transition-all duration-200 ${activeTab === "tab2"
              ? "text-white bg-[#0090DA]"
              : "text-gray-600 hover:text-[#0090DA] bg-gray-100"
              }`}
          >
            Employees List
          </button>
        </div>

        {/* Tabs Content */}
        <div className="border border-t-0 border-gray-200 rounded-b-md bg-white shadow-sm sm:p-8 p-4">
          {activeTab === "tab1" && (
            <div>
              {/* Replace this with your actual component */}
              {/* <h4 className="sm:text-md text-sm font-[400] text-[#787878]  text-start pb-[15px]">Create New Employee Details Here</h4> */}
              <form
                onSubmit={handleAddEmployee}
                className="max-w-3xl mx-auto bg-gray-50 sm:p-6 p-2 rounded-lg shadow-md mb-8 grid grid-cols-1 gap-4 space-y-2"
              >

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={newEmployee.firstName}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={newEmployee.lastName}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex justify-end items-center">
                  <button
                    type="submit"
                    className="w-fit right-0 bg-[#a3ce4e] text-white rounded-md px-4 py-2 hover:cursor-pointer transition"
                  >
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          )}
          {activeTab === "tab2" && (
            <div>
              {/* Replace this with your actual component */}
              {
                employeeAttendanceLoading ? <p>Loading Attendance Data</p> : employees.length ?

                  <div className="overflow-x-auto max-w-full mx-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-[#0090DA]">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                              Employee ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                              First Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                              Last Name
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {employees.map((emp, index) => (
                            <tr
                              key={emp.empID}
                              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {emp.employeeId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {emp.firstName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {emp.lastName}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div> : <p>There are no any Records</p>
              }
            </div>
          )}
        </div>
      </div>




    </div>
  );
}
