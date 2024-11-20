import React, { useEffect, useState } from 'react';

// Modal Component
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{project.name}</h2>
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Due Date:</strong> {project.dueDate}</p>
        <button className="mt-4 text-red-500" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // State for selected project

  useEffect(() => {
    const fetchProjects = async () => {
      const dummyData = [
        { id: 1, name: 'Project One', description: 'Description for project one', dueDate: '2023-12-01' },
        { id: 2, name: 'Project Two', description: 'Description for project two', dueDate: '2023-12-15' },
        { id: 3, name: 'Project Three', description: 'Description for project three', dueDate: '2023-12-30' },
      ];
      setProjects(dummyData);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleViewClick = (project) => {
    setSelectedProject(project); // Set the selected project for the modal
  };

  const handleCloseModal = () => {
    setSelectedProject(null); // Close the modal
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
            <tr key={project.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{project.id}</td>
              <td className="py-2 px-4 border-b">{project.name}</td>
              <td className="py-2 px-4 border-b">{project.description}</td>
              <td className="py-2 px-4 border-b">{project.dueDate}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:underline" onClick={() => handleViewClick(project)}>View</button>
                <button className="text-blue-500 hover:underline ml-4">Edit</button>
                <button className="text-red-500 hover:underline ml-4">Delete</button>
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
