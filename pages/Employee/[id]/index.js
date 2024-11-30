import { useState } from "react";
import EmployeeCard from "@/components/EmployeeCard/EmployeeCard";
import Kanban from "@/components/Kanban/Kanban";
import { useRouter } from "next/router";


export default function EmployeeDetail() {
  const r = useRouter();
  const id = r.query.id;
  const employee = {
    id: "EMP001",
    name: "Alice Johnson",
    picture: "https://via.placeholder.com/150", // Replace with real image URL
  };

  const groups = [
    {
      title: "To Do",
      tasks: [
        {
          id: 1,
          title: "Design Wireframes",
          description: "Create wireframes for the new project dashboard",
          dueDate: "10 days left",
          assignees: ["Alice", "Bob"],
        },
      ],
    },
    {
      title: "In Progress",
      tasks: [
        {
          id: 2,
          title: "Deploy App",
          description: "Release the TaskFlow app to production servers",
          dueDate: "Tomorrow",
          assignees: ["Charlie"],
        },
      ],
    },
    {
      title: "Done",
      tasks: [
        {
          id: 3,
          title: "Develop Backend",
          description: "Implement backend features for task management",
          status: "undefined",
          assignees: [],
        },
      ],
    },
  ];

  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Alice",
      message:
        "The task card modals should include a section for adding comments to facilitate team communication and collaboration.",
    },
    {
      id: 2,
      name: "Bob",
      message:
        "It would be helpful to have a section in the task card modals for attaching files related to the task, such as design mockups or documents.",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), name: "You", message: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">

      {/* Employee Card */}
      <div className="mt-6">
        <EmployeeCard id = {id}/>
      </div>

      {/* Kanban Board */}
      <Kanban id = {id}/>
      

      {/* Group Chat Section */}
      <div className="mt-12 bg-white p-8 rounded-lg shadow-lg border-t-4 border-blue-500">
        <h2 className="text-xl font-semibold text-gray-800">Group Chat</h2>
        <div className="mt-4 space-y-6 max-h-60 overflow-y-auto">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <p className="text-sm font-bold text-blue-700">{comment.name}</p>
              <p className="text-sm text-gray-600 mt-1">{comment.message}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center space-x-4">
          <input
            type="text"
            className="flex-1 border rounded-lg p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
            placeholder="Type your message..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-blue-600 transition"
            onClick={handlePostComment}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
}
