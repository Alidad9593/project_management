// pages/create-project.js
import React, { useEffect, useState } from "react";

export default function CreateProject() {
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employee');
        if (!response.ok) throw new Error('Failed to fetch employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployees((prev) => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId) 
        : [...prev, employeeId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const projectData = {
      project_name: projectName,
      description,
      due_date: dueDate,
      priority: selectedPriority,
      employee_ids: selectedEmployees,
    };

    const response = await fetch('/api/create_project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (response.ok) {
      alert('Project created successfully!');
    } else {
      alert('Failed to create project.');
    }
  };

  return (
    <div className="flex bg-gray-100">
      <div className="flex-1 p-4 md:p-6 lg:p-10 flex flex-col items-center justify-center">
        <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md w-full max-w-3xl flex flex-col">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 lg:mb-8">Create New Project</h2>
          <form className="space-y-4 md:space-y-6 flex-1" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input 
                type="text" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                placeholder="Enter project name" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                rows="3" 
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input 
                type="date" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assign Team Members</label>
              {employees.map(employee => (
                <div key={employee.id}>
                  <input 
                    type="checkbox" 
                    id={`employee-${employee.id}`} 
                    value={employee.id} 
                    checked={selectedEmployees.includes(employee.id)} 
                    onChange={() => handleCheckboxChange(employee.id)} 
                  />
                  <label htmlFor={`employee-${employee.id}`} className="ml-2">{employee.name}</label>
                </div>
              ))}
            </div>
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
            <div className="pt-4">
              <button type="submit" className="w-full bg-teal-600 text-white font-medium py-2 rounded-md hover:bg-teal-700 transition duration-300">
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
