import { useState, useEffect } from "react";

function EmployeeCard({id}) {
  const [employee, setEmployee] = useState(null);
  
  useEffect(() => {
    if (id) {
      // Fetch employee data when the id is available
      fetch('/api/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ option: 4, id: id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Assuming the API returns employee data in the following format
          setEmployee(data.employee);  // Set the employee data into state
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [id]);  // Fetch data when the id changes

  // If employee data is not yet loaded, show a loading state
  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md border hover:shadow-lg transition max-w-sm mx-auto">
      <img
        src={employee.picture || '/default-avatar.png'} // Use a default image if no picture is available
        alt={`${employee.name}'s profile`}
        className="w-16 h-16 rounded-full object-cover border"
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{employee.name}</h3>
        <p className="text-sm text-gray-500">ID: {employee.id}</p>
        <p className="text-sm text-gray-500">Role: {employee.role}</p>
      </div>
    </div>
  );
}

export default EmployeeCard;
