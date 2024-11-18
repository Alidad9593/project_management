// pages/employee-list.js
import React from 'react';
import classes from './EmployeeList.module.css';
import { useState , useEffect } from 'react';

export default function EmployeeList() {
  // Dummy data for employees
  // const employees = [
  //   { id: 'UID123', name: 'Alice', email: 'AliceJohnson@gmail.com' },
  //   { id: 'UID678', name: 'Brian', email: 'BrianSmith@gmail.com' },
  //   { id: 'UID112', name: 'Clara Adams', email: 'ClaraAdams@gmail.com' },
  // ];

  const [employees , setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employee'); // API endpoint
        if (!response.ok) throw new Error('Failed to fetch employees');
        const data = await response.json();
        if(!data){
          return(
            <div>
              <p>Loading...</p>
            </div>
          )
        }
        setEmployees(data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <>
    <div className={classes.container}>
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4 flex items-center">
        Employee List <span className="ml-5">👥</span>
      </h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="text-center hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{employee.name}</td>
              <td className="py-2 px-4 border-b text-blue-500 underline">
                <a href={`mailto:${employee.email}`}>{employee.email}</a>
              </td>
              <td className="py-2 px-4 border-b">{employee.id}</td>
              <td className="py-2 px-4 border-b">
                <button className={classes.button}>Edit</button>
                <button className={classes.button}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
}
