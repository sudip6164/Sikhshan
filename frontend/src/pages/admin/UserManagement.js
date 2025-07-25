"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSearch,
  faPlus,
  faUser,
  faEye,
  faTimes
} from "@fortawesome/free-solid-svg-icons"

function UserManagement() {
  const navigate = useNavigate()
  const location = useLocation()
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [viewUser, setViewUser] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // Mock data
        const mockUsers = [
    {
      id: 1,
      name: "John Doe",
            email: "john.doe@example.com",
            role: "faculty",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "student",
      status: "active",
    },
    {
      id: 3,
            name: "Bob Wilson",
            email: "bob.wilson@example.com",
            role: "faculty",
            status: "inactive",
          },
          {
            id: 4,
            name: "Alice Brown",
            email: "alice.brown@example.com",
      role: "student",
            status: "suspended",
          },
        ]
        
        setUsers(mockUsers)
        setFilteredUsers(mockUsers)
      } catch (error) {
        setError("Failed to load users. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    // Filter users based on search query and filters
    const filtered = users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = selectedRole === "all" || user.role === selectedRole
      const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
      
      return matchesSearch && matchesRole && matchesStatus
    })
    
    setFilteredUsers(filtered)
  }, [searchQuery, selectedRole, selectedStatus, users])

  useEffect(() => {
    if (location.state && location.state.success) {
      setSuccess(location.state.success)
      // Clear the state so the message doesn't persist on refresh
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setUsers(users.filter((user) => user.id !== userId))
        setSuccess("User deleted successfully.")
        setTimeout(() => setSuccess("") , 3000)
      } catch (error) {
        setError("Failed to delete user. Please try again.")
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <button
          onClick={() => navigate("/admin/users/add")}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add User
        </button>
      </div>

      {/* Feedback Messages */}
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Bar */}
            <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
            </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

          {/* Role Filter */}
            <div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Roles</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              </select>
            </div>

          {/* Add User Button */}
          <div>
            <button
              onClick={() => navigate("/admin/users/add")}
              className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
            >
              Add User
            </button>
          </div>
          </div>
        </div>

        {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary bg-opacity-10 text-primary">
                        {user.role}
                      </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setViewUser(user)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                        title="View User"
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-1" /> View
                      </button>
                      <button
                        onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                        className="text-primary hover:text-primary-dark"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setViewUser(null)}
              title="Close"
            >
              <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
            </button>
            <div className="flex flex-col items-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center mb-2">
                <FontAwesomeIcon icon={faUser} className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{viewUser.name}</h2>
              <p className="text-gray-500 mb-2">{viewUser.email}</p>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary bg-opacity-10 text-primary mb-2">
                {viewUser.role}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${viewUser.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {viewUser.status}
              </span>
            </div>
            <div className="space-y-2">
              <div><span className="font-medium text-gray-700">User ID:</span> {viewUser.id}</div>
              {/* Add more user details here if available */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement 