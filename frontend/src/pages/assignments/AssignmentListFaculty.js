"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"

// Mock data for assignments
const mockAssignments = [
  {
    id: 1,
    title: "Programming Basics Assignment",
    course: "CS101",
    courseName: "Introduction to Computer Science",
    dueDate: "2024-03-20",
    dueTime: "23:59",
    totalPoints: 100,
    submissions: 35,
    status: "active",
    description: "Complete the basic programming exercises covering variables, loops, and functions.",
  },
  {
    id: 2,
    title: "Data Structures Project",
    course: "CS201",
    courseName: "Data Structures and Algorithms",
    dueDate: "2024-03-25",
    dueTime: "23:59",
    totalPoints: 150,
    submissions: 28,
    status: "active",
    description: "Implement and analyze various data structures including linked lists, stacks, and queues.",
  },
  {
    id: 3,
    title: "Database Design Assignment",
    course: "CS301",
    courseName: "Database Management Systems",
    dueDate: "2024-03-15",
    dueTime: "23:59",
    totalPoints: 100,
    submissions: 30,
    status: "completed",
    description: "Design and implement a database schema for a library management system.",
  },
]

function AssignmentListFaculty() {
  const { currentUser } = useAuth()
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [filter, setFilter] = useState("all") // all, active, completed

  // Redirect if not faculty
  if (currentUser?.role !== "faculty") {
    return <div className="text-center p-8">You don't have permission to view this page.</div>
  }

  const filteredAssignments = mockAssignments.filter((assignment) => {
    if (filter === "all") return true
    return assignment.status === filter
  })

  const handleDelete = (assignmentId) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      // Here you would typically make an API call to delete the assignment
      alert("Assignment deleted (mock)")
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Assignments</h1>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="all">All Assignments</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <Link
            to="/faculty/assignments/create"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Create Assignment
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assignment List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">All Assignments</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className={`p-6 hover:bg-gray-50 cursor-pointer ${selectedAssignment?.id === assignment.id ? 'bg-primary-50' : ''}`}
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {assignment.course} - {assignment.courseName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Due: {assignment.dueDate} at {assignment.dueTime}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          assignment.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">{assignment.submissions} Submissions</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assignment Details */}
        <div className="bg-white rounded-lg shadow p-6">
          {selectedAssignment ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedAssignment.title}</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Course</p>
                  <p className="text-base text-gray-900">
                    {selectedAssignment.course} - {selectedAssignment.courseName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Due Date</p>
                  <p className="text-base text-gray-900">
                    {selectedAssignment.dueDate} at {selectedAssignment.dueTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Points</p>
                  <p className="text-base text-gray-900">{selectedAssignment.totalPoints}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Submissions</p>
                  <p className="text-base text-gray-900">{selectedAssignment.submissions}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="text-base text-gray-900">{selectedAssignment.description}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  to={`/faculty/assignments/${selectedAssignment.id}/edit`}
                  className="block w-full px-4 py-2 bg-primary text-white text-center rounded-md hover:bg-primary-dark"
                >
                  Edit Assignment
                </Link>
                <button
                  onClick={() => handleDelete(selectedAssignment.id)}
                  className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
                >
                  Delete Assignment
                </button>
                <Link
                  to={`/faculty/assignments/${selectedAssignment.id}/submissions`}
                  className="block w-full px-4 py-2 border border-primary text-primary text-center rounded-md hover:bg-primary-50"
                >
                  View Submissions
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Select an assignment to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AssignmentListFaculty 