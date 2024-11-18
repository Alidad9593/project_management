// pages/add-employee.js
import React from 'react';

export default function AddEmployee() {
  return (
    <>
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Email Address"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Phone Number"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Position</label>
            <select className="w-full px-4 py-2 border rounded-md focus:outline-none">
              <option>Select Position</option>
              <option>Manager</option>
              <option>Developer</option>
              <option>Designer</option>
              <option>Analyst</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">Start Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="YYYY-MM-DD"
            />
          </div>
        </form>
      </div>

      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Login Information</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Password"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              placeholder="Confirm Password"
            />
          </div>
        </form>
      </div>

      <div className="w-full max-w-4xl flex justify-end space-x-4">
        <button className="px-6 py-2 border rounded-md hover:bg-gray-200">Cancel</button>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Create Employee
        </button>
      </div>
    </div>
    </>
  );
}
