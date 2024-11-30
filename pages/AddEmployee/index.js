// // pages/add-employee.js
// import React from 'react';
// import { useRef } from 'react';

// export default function AddEmployee() {
//   const name = useRef();
//   const email = useRef();
//   const phone_no = useRef();
//   const position = useRef();
//   const start_date = useRef();
//   const username = useRef();
//   const password = useRef();
//   const id = useRef();

//   function AddEmployeehandler() {
//     event.preventDefault();
//     const enteredName = name.current.value;
//     const enteredEmail = email.current.value;
//     const enteredPhone_no = phone_no.current.value;
//     const enteredPosition = position.current.value;
//     const enteredStart_date = start_date.current.value;
//     const enteredUsername = username.current.value;
//     const enteredPassword = password.current.value;
//     const opt = 1; // 1 => add employee

//     fetch('/api/employee', {
//       method: 'POST',
//       body: JSON.stringify({
//         name: enteredName,
//         email: enteredEmail,
//         phone_no: enteredPhone_no,
//         position: enteredPosition,
//         start_date: enteredStart_date,
//         username: enteredUsername,
//         password: enteredPassword,
//         option: opt,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }).then((response) => {
//       if (!response.ok) {
//         return response.json().then((data) => {
//           if (data.error === 'Username already exists') {
//             alert('Username already exists. Please choose a different username.');
//           } else {
//             alert('Failed to add employee. Please try again.');
//           }
//           throw new Error(data.error || 'Failed to add employee');
//         });
//       }
//       return response.json();
//     })
//     .then((data) => {
//       alert('Employee added successfully!');
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   }

//   return (
//     <>
//     <div className="container mx-auto p-8 bg-gray-100 min-h-screen flex flex-col items-center">
//       <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-6">
//         <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* <div>
//             <label className="block text-gray-700 font-semibold mb-1">Employee ID</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none"
//               placeholder="Employee ID" 
//               ref={id}
//             />
//           </div> */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none"
//               placeholder="Full Name"
//               ref={name}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none"
//               placeholder="Email Address"
//               ref={email}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none"
//               placeholder="Phone Number"
//               ref={phone_no}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Position</label>
//             <select ref={position} className="w-full px-4 py-2 border rounded-md focus:outline-none">
//               <option>Select Position</option>
//               <option>Manager</option>
//               <option>Developer</option>
//               <option>Designer</option>
//               <option>Analyst</option>
//             </select>
            
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-gray-700 font-semibold mb-1">Start Date</label>
//             <input
//               type="date"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none"
//               placeholder="YYYY-MM-DD"
//               ref={start_date}
//             />
//           </div>
//         </form>
//       </div>

//       <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-6">
//         <h2 className="text-2xl font-bold mb-4">Login Information</h2>
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Username</label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none"
//               placeholder="Username"
//               ref={username}
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-semibold mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none"
//               placeholder="Password"
//               ref={password}
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none"
//               placeholder="Confirm Password"
//             />
//           </div>
//         </form>
//       </div>

//       <div className="w-full max-w-4xl flex justify-end space-x-4">
//         <button className="px-6 py-2 border rounded-md hover:bg-gray-200">Cancel</button>
//         <button onClick={AddEmployeehandler} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//           Create Employee
//         </button>
//       </div>
//     </div>
//     </>
//   );
// }


//Restricted check implemented

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import PasswordPopup from '../../components/PasswordPopUp/Passwordpopup';

export default function AddEmployee() {
  const r = useRouter();  
  const [isAuthorized, setIsAuthorized] = useState(false); // Tracks if the user is authorized
  const [passwordError, setPasswordError] = useState(''); // Tracks password error messages
  const name = useRef();
  const email = useRef();
  const phone_no = useRef();
  const position = useRef();
  const start_date = useRef();
  const username = useRef();
  const password = useRef();

  // Function to handle password verification
  const verifyPassword = async (enteredPassword) => {
    try {
      const response = await fetch('/api/admin-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: enteredPassword }),
      });

      const data = await response.json();

      if (data.valid) {
        setIsAuthorized(true); // Grant access
        setPasswordError(''); // Clear any error messages
      } else {
        setPasswordError('Incorrect password. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      setPasswordError('Failed to verify password. Please try again.');
    }
  };

  function AddEmployeeHandler(event) {
    event.preventDefault();
    const enteredName = name.current.value;
    const enteredEmail = email.current.value;
    const enteredPhone_no = phone_no.current.value;
    const enteredPosition = position.current.value;
    const enteredStart_date = start_date.current.value;
    const enteredUsername = username.current.value;
    const enteredPassword = password.current.value;

    fetch('/api/employee', {
      method: 'POST',
      body: JSON.stringify({
        name: enteredName,
        email: enteredEmail,
        phone_no: enteredPhone_no,
        position: enteredPosition,
        start_date: enteredStart_date,
        username: enteredUsername,
        password: enteredPassword,
        option: 1, // Option 1 for adding an employee
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Employee added successfully!');
        }
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
        alert('Failed to add employee. Please try again.');
      });
  }

  return (
    <div>
      {!isAuthorized ? (
        // Render the password popup if the user is not authorized
        <PasswordPopup
          onClose={() => r.back()}
          onSubmit={verifyPassword}
        />
      ) : (
        // Render the Add Employee form if the user is authorized
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
                  ref={name}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Email Address"
                  ref={email}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none"
                  placeholder="Phone Number"
                  ref={phone_no}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Position</label>
                <select ref={position} className="w-full px-4 py-2 border rounded-md focus:outline-none">
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
                  ref={start_date}
                />
              </div>
            </form>
          </div>
          <div className="w-full max-w-4xl flex justify-end space-x-4">
            <button onClick={() => r.back()} className="px-6 py-2 border rounded-md hover:bg-gray-200">Cancel</button>
            <button onClick={AddEmployeeHandler} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Create Employee
            </button>
          </div>
        </div>
      )}
      {passwordError && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="text-red-500 text-lg font-semibold">{passwordError}</p>
            <button
              onClick={() => setPasswordError('')}
              className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
