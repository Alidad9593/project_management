import React, { useEffect, useState } from 'react';

const Projectdetail = ({ project, onClose }) => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (project) {
        try {
          const response = await fetch(`/api/project_assignment?project_id=${project.project_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch project assignments');
          }
          const data = await response.json();
          setAssignments(data); // Set the assignments state
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchAssignments();
  }, [project]); // Fetch assignments whenever the project changes

  if (!project) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">{project.project_name}</h2>
        <p className="mb-2"><strong>Description:</strong> {project.description}</p>
        <p className="mb-2"><strong>Due Date:</strong> {new Date(project.due_date).toLocaleDateString()}</p>
        <p className="mb-2"><strong>Priority:</strong> <span className={`font-semibold ${project.priority === 'High' ? 'text-red-500' : project.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>{project.priority}</span></p>
        <p className="mb-2"><strong>Assignments:</strong></p>
        <ul className="list-disc list-inside">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <li key={assignment.employee_id}>Employee ID: {assignment.employee_id}</li>
            ))
          ) : (
            <li>No assignments found.</li>
          )}
        </ul>
        {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}
        <button className="mt-4 text-red-500" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Projectdetail;
