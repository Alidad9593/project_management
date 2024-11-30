
// import { useState, useEffect } from 'react';

// export default function Kanban({ id }) {
//   const [kanbanData, setKanbanData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch Kanban board data from API
//     fetch('/api/kanban', {  // Adjust the API endpoint if necessary
//       method: 'POST',
//       body: JSON.stringify({ id }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.kanban) {
//           // Group tasks by their status for different columns (To Do, In Progress, Done)
//           const groupedData = data.kanban.reduce((acc, task) => {
//             const group = acc[task.status] || { title: task.status, tasks: [] };
//             group.tasks.push({
//               id: task.kanban_id,
//               title: task.project_name,
//               description: task.project_description,
//               dueDate: task.due_date,  // Assuming you also have due date in the API response
//               assignees: task.team_members.split(', '), // Assuming team_members are a comma-separated string
//             });
//             acc[task.status] = group;
//             return acc;
//           }, {});

//           // Set grouped data for rendering
//           setKanbanData(Object.values(groupedData));
//         } else {
//           console.error('No kanban data found:', data);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching Kanban data:', error);
//         setLoading(false);
//       });
//   }, [id]); // Trigger the effect when the `id` prop changes

//   if (loading) {
//     return <div>Loading...</div>;  // Show loading state while fetching data
//   }

//   return (
//     <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
//       {kanbanData.map((group) => (
//         <div
//           key={group.title}
//           className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500"
//         >
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">{group.title}</h2>
//           <div className="space-y-4">
//             {group.tasks.map((task) => (
//               <div
//                 key={task.id}
//                 className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
//               >
//                 <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
//                 <p className="text-sm text-gray-500">{task.description}</p>
//                 <p className="text-xs text-gray-400 mt-2">{task.dueDate}</p>
//                 <div className="flex mt-3 space-x-2">
//                   {task.assignees.map((name, idx) => (
//                     <div
//                       key={idx}
//                       className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
//                     >
//                       {name[0]} {/* Displaying initials of assignees */}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';

// export default function Kanban({ id }) {
//   const [kanbanData, setKanbanData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch Kanban board data from API
//     fetch('/api/kanban', {  // Adjust the API endpoint if necessary
//       method: 'POST',
//       body: JSON.stringify({ id }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.kanban) {
//           // Group tasks by their status for different columns (To Do, In Progress, Done)
//           const groupedData = data.kanban.reduce((acc, task) => {
//             const group = acc[task.status] || { title: task.status, tasks: [] };
//             group.tasks.push({
//               id: task.kanban_id,
//               title: task.project_name,
//               description: task.project_description,
//               dueDate: task.due_date,  // Assuming you also have due date in the API response
//               assignees: task.team_members.split(', '), // Assuming team_members are a comma-separated string
//             });
//             acc[task.status] = group;
//             return acc;
//           }, {});

//           // Set grouped data for rendering
//           setKanbanData(Object.values(groupedData));
//         } else {
//           console.error('No kanban data found:', data);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching Kanban data:', error);
//         setLoading(false);
//       });
//   }, [id]); // Trigger the effect when the `id` prop changes

//   const updateTaskStatus = (taskId, newStatus) => {
//     // API call to update the status of the task
//     fetch('/api/update-status', {  // Adjust the API endpoint
//       method: 'POST',
//       body: JSON.stringify({ taskId, newStatus }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           // On success, update the local state to reflect the change
//           setKanbanData((prevData) => {
//             const updatedData = prevData.map((group) => {
//               // Update tasks' status in their respective groups
//               group.tasks = group.tasks.map((task) => {
//                 if (task.id === taskId) {
//                   task.status = newStatus;
//                 }
//                 return task;
//               });
//               return group;
//             });
//             return updatedData;
//           });
//         } else {
//           console.error('Failed to update task status:', data);
//         //   console.log('Task ID:', taskId);
//         //     console.log('New Status:', newStatus);
//         }
//       })
//       .catch((error) => {
//         console.error('Error updating task status:', error);
//       });
//   };

//   if (loading) {
//     return <div>Loading...</div>;  // Show loading state while fetching data
//   }

//   return (
//     <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
//       {['To Do', 'In Progress', 'Done'].map((status) => (
//         <div
//           key={status}
//           className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500"
//         >
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">{status}</h2>
//           <div className="space-y-4">
//             {/* Render tasks for this status */}
//             {kanbanData
//               .filter((group) => group.title === status) // Filter tasks by status
//               .flatMap((group) => group.tasks) // Flatten tasks array
//               .map((task) => (
//                 <div
//                   key={task.id}
//                   className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
//                 >
//                   <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
//                   <p className="text-sm text-gray-500">{task.description}</p>
//                   <p className="text-xs text-gray-400 mt-2">{task.dueDate}</p>
//                   <div className="flex mt-3 space-x-2">
//                     {task.assignees.map((name, idx) => (
//                       <div
//                         key={idx}
//                         className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
//                       >
//                         {name[0]} {/* Displaying initials of assignees */}
//                       </div>
//                     ))}
//                   </div>
//                   {/* Button to move task to next status */}
//                   {status === 'To Do' && (
//                     <button
//                       className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
//                       onClick={() => updateTaskStatus(task.id, 'In Progress')}
//                     >
//                       Move to In Progress
//                     </button>
//                   )}
//                   {status === 'In Progress' && (
//                     <button
//                       className="mt-2 p-2 bg-green-500 text-white rounded-lg"
//                       onClick={() => updateTaskStatus(task.id, 'Done')}
//                     >
//                       Move to Done
//                     </button>
//                   )}
//                 </div>
//               ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



import { useState, useEffect } from "react";

export default function Kanban({ id }) {
  const [kanbanData, setKanbanData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Kanban board data from API
    fetch("/api/kanban", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.kanban) {
          // Group tasks by their status
          const groupedData = data.kanban.reduce((acc, task) => {
            const group = acc[task.status] || { title: task.status, tasks: [] };
            group.tasks.push({
              id: task.kanban_id,
              title: task.project_name,
              description: task.project_description,
              dueDate: task.due_date,
              assignees: task.team_members.split(", "),
            });
            acc[task.status] = group;
            return acc;
          }, {});

          setKanbanData(Object.values(groupedData));
        } else {
          console.error("No kanban data found:", data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Kanban data:", error);
        setLoading(false);
      });
  }, [id]);

  const updateTaskStatus = (taskId, newStatus) => {
    // Optimistically update local state
    setKanbanData((prevData) => {
      const updatedData = prevData.map((group) => {
        if (group.title === newStatus) {
          return {
            ...group,
            tasks: [
              ...group.tasks,
              ...prevData
                .flatMap((g) => g.tasks)
                .filter((task) => task.id === taskId), // Add task to the new group
            ],
          };
        }
        return {
          ...group,
          tasks: group.tasks.filter((task) => task.id !== taskId), // Remove task from old group
        };
      });
      return updatedData;
    });

    // API call to persist the change
    fetch("/api/update-status", {
      method: "POST",
      body: JSON.stringify({ taskId, newStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          console.error("Failed to update task status on the server:", data);
        }
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {["To Do", "In Progress", "Done"].map((status) => (
        <div
          key={status}
          className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{status}</h2>
          <div className="space-y-4">
            {kanbanData
              .filter((group) => group.title === status)
              .flatMap((group) => group.tasks)
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-medium text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <p className="text-xs text-gray-400 mt-2">{task.dueDate}</p>
                  <div className="flex mt-3 space-x-2">
                    {task.assignees.map((name, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
                      >
                        {name[0]}
                      </div>
                    ))}
                  </div>
                  {status === "To Do" && (
                    <button
                      className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
                      onClick={() => updateTaskStatus(task.id, "In Progress")}
                    >
                      Move to In Progress
                    </button>
                  )}
                  {status === "In Progress" && (
                    <button
                      className="mt-2 p-2 bg-green-500 text-white rounded-lg"
                      onClick={() => updateTaskStatus(task.id, "Done")}
                    >
                      Move to Done
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
