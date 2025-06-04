import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react"; // Optional icon

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home Page", to: "/" },
    { name: "Employees Section", to: "/employees" },
    { name: "Attendance Details", to: "/attendancedetails" },
    { name: "Submit Attendance", to: "/attendanceform" },
  ];

  return (
    <>
      {/* Toggle button (visible on small screens) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`md:m-6 mt-4 bg-white shadow-lg rounded-md transition-transform duration-300 h-full fixed top-0 left-0 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 md:translate-x-0 md:static md:block`}
      >
        <div className="flex flex-col h-full">
          <div className="py-4 ps-6 pe-2 flex justify-between items-center">
            <span className="font-[500] text-xl text-gray-800">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-500 md:hidden"
            >
              ✕
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)} // auto-close on mobile
                className={`p-2 rounded-md hover:bg-[#0090DA] hover:text-white ${
                  location.pathname === link.to
                    ? "bg-[#0090DA] text-white"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
