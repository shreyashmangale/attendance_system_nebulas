# Employee Attendance Management System

A full-stack Employee Attendance Management System with a React + Vite + Tailwind CSS frontend and a Node.js + Express backend using MySQL and MongoDB.

## Features

- Employee registration and management
- Mark daily attendance (Present/Absent)
- View attendance records and filter by employee or date
- Dashboard with attendance statistics
- MySQL for employee data, MongoDB for attendance records

---

## Project Structure

```
attendance_system/      # Frontend (React)
backend/                # Backend (Node.js, Express, MySQL, MongoDB)
```

---

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MySQL server (with a database named `employeedb`)
- MongoDB Atlas or local MongoDB instance

---

## Backend Setup

1. **Configure Environment Variables**

   In `backend/.env`:
   ```
   PORT=8000
   MYSQL_PASSWORD=your_mysql_password
   MONGODB_CONNECTION=your_mongodb_connection_string
   ```

2. **Install Dependencies**

   ```sh
   cd backend
   npm install
   ```

3. **Start Backend Server**

   ```sh
   npm start
   ```

   The backend will run on `http://localhost:8000`.

---

## Frontend Setup

1. **Install Dependencies**

   ```sh
   cd attendance_system
   npm install
   ```

2. **Start Frontend Development Server**

   ```sh
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` (default Vite port).

---

## Database Setup

- **MySQL:**  
  Create a database named `employeedb` and a table `employees`:
  ```sql
  CREATE DATABASE employeedb;
  USE employeedb;
  CREATE TABLE employees (
    employeeId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255)
  );
  ```

- **MongoDB:**  
  No manual setup required; attendance records will be stored in the `employee_attendance_db` database and `employee_attendance` collection automatically.

---

## Usage

- Access the frontend at [http://localhost:5173](http://localhost:5173)
- Register employees, mark attendance, and view attendance data via the UI.

---

## API Endpoints

- `GET /employeesdata` - List all employees
- `POST /employeesdata` - Add a new employee
- `GET /employeesattendance` - List all attendance records
- `POST /employeesattendance` - Mark attendance
- `GET /employeeattendance/today-present` - Get today's present employees

---

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Axios, MUI
- **Backend:** Node.js, Express, MySQL, MongoDB, dotenv, cors

---

## Author

- Shreyash Mangale
