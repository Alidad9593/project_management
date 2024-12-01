
//After edit the employee list page will look like this

// import React, { useState, useEffect } from 'react';
// import classes from './EmployeeList.module.css';

// export default function EmployeeList() {
//   const [employees, setEmployees] = useState([]);
//   const [refresh, setRefresh] = useState(false);
//   const [editingEmployee, setEditingEmployee] = useState(null); // Employee being edited
//   const [showModal, setShowModal] = useState(false); // Modal visibility
//   const [isAuthorized, setIsAuthorized] = useState(false); // Tracks if the user is authorized
//   const [passwordError, setPasswordError] = useState(''); // Tracks password error messages

//   const verifyPassword = async (enteredPassword) => {
//     try {
//       const response = await fetch('/api/admin-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ password: enteredPassword }),
//       });

//       const data = await response.json();

//       if (data.valid) {
//         setIsAuthorized(true); // Grant access
//         setPasswordError(''); // Clear any error messages
//       } else {
//         setPasswordError('Incorrect password. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error verifying password:', error);
//       setPasswordError('Failed to verify password. Please try again.');
//     }
//   };
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await fetch('/api/employee'); // API endpoint
//         if (!response.ok) throw new Error('Failed to fetch employees');
//         const data = await response.json();
//         setEmployees(data); // Update state with fetched data
//       } catch (error) {
//         console.error('Error fetching employees:', error);
//       }
//     };

//     fetchEmployees();
//   }, [refresh]);

//   function Deletehandler(eid) {
//     if (!window.confirm('Are you sure you want to delete this employee?')) {
//       return;
//     }
//     const opt = 2; // 2 => Delete Employee
//     fetch('/api/employee/', {
//       method: 'DELETE',
//       body: JSON.stringify({ id: eid, option: opt }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error) {
//           alert(data.error);
//         } else {
//           alert(data.message);
//           setRefresh(!refresh);
//         }
//       });
//   }

//   function Edithandler(eid) {
//     const employee = employees.find((emp) => emp.id === eid);
//     if (employee) {
//       setEditingEmployee({ ...employee });
//       setShowModal(true);
//     }
//   }

//   function handleModalChange(e) {
//     const { name, value } = e.target;
//     setEditingEmployee((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function handleEditSubmit(e) {
//     e.preventDefault();
//     const { id, email, phone_number, role } = editingEmployee;

//     fetch('/api/employee/', {
//       method: 'POST',
//       body: JSON.stringify({
//         id,
//         email,
//         phone_number,
//         role,
//         option: 3, // 3 => Edit Employee
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error) {
//           alert(data.error);
//         } else {
//           alert(data.message);
//           setRefresh(!refresh);
//         }
//         setShowModal(false); // Close modal
//       })
//       .catch((error) => console.error('Error updating employee:', error));
//   }

//   return (
//     <>
    
//       <div className={classes.container}>
//         <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
//           <h1 className="text-xl font-bold mb-4 flex items-center">
//             Employee List <span className="ml-5">👥</span>
//           </h1>
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Email</th>
//                 <th className="py-2 px-4 border-b">ID</th>
//                 <th className="py-2 px-4 border-b">Role</th>
//                 <th className="py-2 px-4 border-b">Phone#</th>
//                 <th className="py-2 px-4 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((employee) => (
//                 <tr key={employee.id} className="text-center hover:bg-gray-100">
//                   <td className="py-2 px-4 border-b">{employee.name}</td>
//                   <td className="py-2 px-4 border-b text-blue-500 underline">
//                     <a href={`mailto:${employee.email}`}>{employee.email}</a>
//                   </td>
//                   <td className="py-2 px-4 border-b">{employee.id}</td>
//                   <td className="py-2 px-4 border-b">{employee.role}</td>
                  
//                   <td className="py-2 px-4 border-b">{employee.phone_number}</td>
//                   <td className="py-2 px-4 border-b">
//                     <button onClick={() => Edithandler(employee.id)} className={classes.button}>
//                       Edit
//                     </button>
//                     <button onClick={() => Deletehandler(employee.id)} className={classes.button}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal for editing employee */}
//       {showModal && (
//         <div className={classes.modalOverlay}>
//           <div className={classes.modal}>
//             <h2 className="text-lg font-bold mb-4">Edit Employee</h2>
//             <form onSubmit={handleEditSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter new Email"
//                   onChange={handleModalChange}
//                   className="w-full px-4 py-2 border rounded-md focus:outline-none"
//                   // required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Phone Number</label>
//                 <input
//                   type="text"
//                   name="phone_number"
//                   // value={editingEmployee.phone_number}
//                   placeholder='Enter new Phone Number'
//                   onChange={handleModalChange}
//                   className="w-full border px-4 py-2 rounded"
//                   //required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Position</label>
//                 <input
//                   type="text"
//                   name="role"
//                   // value={editingEmployee.role}
//                   placeholder='Enter new Position'
//                   onChange={handleModalChange}
//                   className="w-full border px-4 py-2 rounded"
//                   //required
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button type="button" onClick={() => setShowModal(false)} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


//Authentication

import React, { useState, useEffect } from 'react';
import classes from './EmployeeList.module.css';
import { useRouter } from 'next/router';

export default function EmployeeList() {
  const r = useRouter();
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');

  const verifyPassword = async (enteredPassword) => {
    try {
      const response = await fetch('/api/admin-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: enteredPassword }),
      });

      const data = await response.json();

      if (data.valid) {
        setIsAuthorized(true);
        setPasswordError('');
      } else {
        setPasswordError('Incorrect password. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      setPasswordError('Failed to verify password. Please try again.');
    }
  };

  useEffect(() => {
    if (isAuthorized) {
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
    }
  }, [refresh, isAuthorized]);

  function Deletehandler(eid) {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }
    fetch('/api/employee/', {
      method: 'DELETE',
      body: JSON.stringify({ id: eid, option: 2 }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          setRefresh(!refresh);
        }
      });
  }

  function Edithandler(eid) {
    const employee = employees.find((emp) => emp.id === eid);
    if (employee) {
      setEditingEmployee({ ...employee });
      setShowModal(true);
    }
  }

  function handleModalChange(e) {
    const { name, value } = e.target;
    setEditingEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    const { id, email, phone_number, role } = editingEmployee;

    fetch('/api/employee/', {
      method: 'POST',
      body: JSON.stringify({
        id,
        email,
        phone_number,
        role,
        option: 3,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          setRefresh(!refresh);
        }
        setShowModal(false);
      })
      .catch((error) => console.error('Error updating employee:', error));
  }

  return (
    <>
      {!isAuthorized && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <h2 className="text-lg font-bold mb-4">Enter Password</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyPassword(password);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Password"
                />
              </div>
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              <div className="flex justify-end">
              <button onClick={() => r.back()} type="cancel" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Cancel
                </button>
              
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Submit
                </button>
                
              </div>
            </form>
          </div>
        </div>
      )}

      {isAuthorized && (
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
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Phone#</th>
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
                    <td className="py-2 px-4 border-b">{employee.role}</td>
                    <td className="py-2 px-4 border-b">{employee.phone_number}</td>
                    <td className="py-2 px-4 border-b">
                      <button onClick={() => Edithandler(employee.id)} className={classes.button}>
                        Edit
                      </button>
                      <button onClick={() => Deletehandler(employee.id)} className={classes.button}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
     {/*Modal for editing employee*/}
      {showModal && (
        <div className={classes.modalOverlay}>
          <div className={classes.modal}>
            <h2 className="text-lg font-bold mb-4">Edit Employee</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter new Email"
                  onChange={handleModalChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  // required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  // value={editingEmployee.phone_number}
                  placeholder='Enter new Phone Number'
                  onChange={handleModalChange}
                  className="w-full border px-4 py-2 rounded"
                  //required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Position</label>
                <input
                  type="text"
                  name="role"
                  // value={editingEmployee.role}
                  placeholder='Enter new Position'
                  onChange={handleModalChange}
                  className="w-full border px-4 py-2 rounded"
                  //required
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

