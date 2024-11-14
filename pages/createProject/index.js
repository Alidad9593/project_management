// pages/create-project.js
import React from "react";

export default function CreateProject() {
  // Add state for priority
  const [selectedPriority, setSelectedPriority] = React.useState(null);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-lg p-5">
        <div className="flex justify-between items-center lg:block">
          <h1 className="text-2xl font-bold mb-0 lg:mb-8">TaskFlow</h1>
          {/* Mobile menu button - you might want to add a hamburger menu here */}
        </div>
        <nav className="hidden lg:flex flex-col space-y-4">
          <a href="#" className="text-gray-700 hover:text-gray-900">Dashboard</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Projects</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Employee</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Settings</a>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-10 flex flex-col items-center justify-center">
        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md w-full max-w-3xl flex flex-col">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 lg:mb-8">Create New Project</h2>
          
          <form className="space-y-4 md:space-y-6 flex-1">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Enter project name" />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3" placeholder="Enter project description"></textarea>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input type="date" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>

            {/* Team Members */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Assign Team Members</label>
              <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="List of Employees" />
            </div>

            {/* Priority */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Set Priority</label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedPriority('high')}
                  className={`w-full sm:w-1/3 p-2 md:p-3 border rounded-md shadow-sm text-center transition-colors duration-200 
                    ${selectedPriority === 'high' 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'border-gray-300 hover:bg-gray-200'}`}
                >
                  High
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPriority('medium')}
                  className={`w-full sm:w-1/3 p-2 md:p-3 border rounded-md shadow-sm text-center transition-colors duration-200 
                    ${selectedPriority === 'medium' 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'border-gray-300 hover:bg-gray-200'}`}
                >
                  Medium
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPriority('low')}
                  className={`w-full sm:w-1/3 p-2 md:p-3 border rounded-md shadow-sm text-center transition-colors duration-200 
                    ${selectedPriority === 'low' 
                      ? 'bg-green-500 text-white border-green-500' 
                      : 'border-gray-300 hover:bg-gray-200'}`}
                >
                  Low
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Upload Files</label>
              <input type="file" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
            </div>
          </form>

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" className="w-full bg-teal-600 text-white font-medium py-2 rounded-md hover:bg-teal-700 transition duration-300">
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
