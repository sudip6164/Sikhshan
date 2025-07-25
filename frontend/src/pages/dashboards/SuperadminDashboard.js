"use client"
import { useAuth } from "../../contexts/AuthContext"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SystemStatusModal from "../../components/admin/SystemStatusModal"
import GenerateReportModal from "../../components/admin/GenerateReportModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUsers,
  faBook,
  faChalkboardTeacher,
  faGraduationCap,
  faPlus,
  faEdit,
  faTrash,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons"

function SuperadminDashboard() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState("")
  const [isSystemStatusOpen, setIsSystemStatusOpen] = useState(false)
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false)
  const [stats] = useState({
    totalUsers: 1024,
    activeCourses: 48,
    facultyMembers: 32,
    students: 986,
    totalRevenue: 0,
    systemHealth: "Good",
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [users, setUsers] = useState([])

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API calls
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // Mock data for recent activities
        setRecentActivities([
          { id: 1, user: "Dr. Smith", action: "Created a new course", time: "2 hours ago" },
          { id: 2, user: "Admin", action: "Added 5 new faculty members", time: "5 hours ago" },
          { id: 3, user: "System", action: "Backup completed successfully", time: "1 day ago" },
          { id: 4, user: "Jane Doe", action: "Generated semester reports", time: "2 days ago" },
        ])

        // Mock data for users
        setUsers([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            role: "FACULTY",
            status: "active",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "STUDENT",
            status: "active",
          },
          {
            id: 3,
            name: "Bob Wilson",
            email: "bob.wilson@example.com",
            role: "FACULTY",
            status: "inactive",
          },
        ])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      }
    }

    fetchDashboardData()
  }, [])

  // Redirect if not superadmin
  if (currentUser?.role !== "SUPERADMIN") {
    return <div className="text-center p-8">You don't have permission to view this page.</div>
  }

  const handleAddUser = () => {
    navigate("/admin/users/add")
  }

  const handleEditUser = (userId) => {
    navigate(`/admin/users/edit/${userId}`)
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setUsers(users.filter((user) => user.id !== userId))
      } catch (error) {
        console.error("Error deleting user:", error)
        alert("Failed to delete user. Please try again.")
      }
    }
  }

  const handleViewAllActivity = () => {
    navigate("/admin/logs")
  }

  const handleGenerateReport = (reportType) => {
    setIsGenerateReportOpen(true)
  }

  return (
    <div className="h-full">
      <div className="bg-primary text-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {greeting}, {currentUser.name}
            </h1>
            <p className="text-white text-opacity-90">Welcome to your system overview</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={() => setIsSystemStatusOpen(true)}
              className="px-4 py-2 bg-white text-primary rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              System Status
            </button>
            <button
              onClick={() => setIsGenerateReportOpen(true)}
              className="px-4 py-2 bg-white text-primary rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              Generate Reports
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-primary">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
              <FontAwesomeIcon icon={faUsers} className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-rose">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-rose bg-opacity-10 text-rose">
              <FontAwesomeIcon icon={faBook} className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Courses</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeCourses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-amber">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-amber bg-opacity-10 text-amber">
              <FontAwesomeIcon icon={faChalkboardTeacher} className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Faculty Members</p>
              <p className="text-3xl font-bold text-gray-900">{stats.facultyMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green bg-opacity-10 text-green">
              <FontAwesomeIcon icon={faGraduationCap} className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Students</p>
              <p className="text-3xl font-bold text-gray-900">{stats.students}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 flex items-center"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Add User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary bg-opacity-10 text-primary">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="text-primary hover:text-primary-dark mr-3"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="border-b border-gray-200 pb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                      {activity.user.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleViewAllActivity}
            className="w-full mt-4 py-2 border border-primary text-primary rounded-md hover:bg-primary-light/10 transition-colors duration-200"
          >
            View All Activity
          </button>
        </div>
      </div>

      {/* Report Export */}
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Report Export</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-md p-6 hover:shadow-md hover:border-primary transition-all duration-200 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
              <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />
            </div>
            <h3 className="ml-3 font-medium text-gray-800">User Activity Report</h3>
          </div>
          <p className="text-sm text-gray-500">
            Download a comprehensive report of all user activities across the platform.
          </p>
          <button
            onClick={() => handleGenerateReport("user_activity")}
            className="mt-4 w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
          >
            Generate
          </button>
        </div>

        <div className="border border-gray-200 rounded-md p-6 hover:shadow-md hover:border-primary transition-all duration-200 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
              <FontAwesomeIcon icon={faBook} className="h-6 w-6" />
            </div>
            <h3 className="ml-3 font-medium text-gray-800">Course Enrollment Report</h3>
          </div>
          <p className="text-sm text-gray-500">Download enrollment statistics and trends for all courses.</p>
          <button
            onClick={() => handleGenerateReport("course_enrollment")}
            className="mt-4 w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
          >
            Generate
          </button>
        </div>

        <div className="border border-gray-200 rounded-md p-6 hover:shadow-md hover:border-primary transition-all duration-200 cursor-pointer">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
              <FontAwesomeIcon icon={faChartLine} className="h-6 w-6" />
            </div>
            <h3 className="ml-3 font-medium text-gray-800">System Performance Report</h3>
          </div>
          <p className="text-sm text-gray-500">Download system metrics, logs, and performance analytics.</p>
          <button
            onClick={() => handleGenerateReport("system_performance")}
            className="mt-4 w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Modals */}
      <SystemStatusModal isOpen={isSystemStatusOpen} onClose={() => setIsSystemStatusOpen(false)} />
      <GenerateReportModal isOpen={isGenerateReportOpen} onClose={() => setIsGenerateReportOpen(false)} />
    </div>
  )
}

export default SuperadminDashboard
