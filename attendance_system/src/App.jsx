import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AttendanceForm from "./components/AttendanceForm";
import EmployeeTable from "./components/EmployeesTable";
import AttendanceData from "./components/AttendanceData";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden bg-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employees" element={<EmployeeTable />} />
              <Route path="/attendancedetails" element={<AttendanceData />} />
              <Route path="/attendanceform" element={<AttendanceForm />} />
            </Routes>
          </main>
        </div>
      </div>

    </>
  )
}

export default App
