import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md h-16 flex items-center md:px-6 px-16 sticky top-0 z-50">
            <h1 className="text-md sm:text-xl md:text-3xl font-[500] text-black font-montserrat">Nebulas Employee Attendance Management System</h1>
        </nav>
    )
}

export default Navbar