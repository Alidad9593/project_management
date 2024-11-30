import React, { useEffect, useState } from 'react';

// Modal Component
const ProjectModal = ({ project, onClose }) => {
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
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{project.project_name}</h2>
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Due Date:</strong> {project.due_date}</p>
        <p><strong>Assignments:</strong></p>
        <ul>
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

// ProjectList Component
const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // State for selected project

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/list_projects'); // Call the API to fetch projects
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleViewClick = (project) => {
    setSelectedProject(project); // Set the selected project for the modal
  };

  const handleCloseModal = () => {
    setSelectedProject(null); // Close the modal
  };

  const handleDeleteClick = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/list_projects?project_id=${projectId}`, {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error('Failed to delete project');
        }
        // Remove the deleted project from the state
        setProjects((prevProjects) => prevProjects.filter(project => project.project_id !== projectId));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Project List</h1>
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b text-left">Project ID</th>
            <th className="py-2 px-4 border-b text-left">Project Name</th>
            <th className="py-2 px-4 border-b text-left">Description</th>
            <th className="py-2 px-4 border-b text-left">Due Date</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.project_id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{project.project_id}</td>
              <td className="py-2 px-4 border-b">{project.project_name}</td>
              <td className="py-2 px-4 border-b">{project.description}</td>
              <td className="py-2 px-4 border-b">{project.due_date}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:underline" onClick={() => handleViewClick(project)}>View</button>
                <button className="text-blue-500 hover:underline ml-4">Edit</button>
                <button className="text-red-500 hover:underline ml-4" onClick={() => handleDeleteClick(project.project_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing project details */}
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </div>
  );
};

export default ProjectList;
