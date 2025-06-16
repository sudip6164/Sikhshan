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
  faChartBar,
  faCalendarAlt,
  faComments,
  faBell,
  faSignOutAlt,
  faChartLine,
  faCog,
  faUserShield,
  faHistory,
} from "@fortawesome/free-solid-svg-icons"

// Mock data
const stats = [
  {
    name: "Total Users",
    value: "1,024",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    color: "primary",
  },
  {
    name: "Active Courses",
    value: "48",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    color: "rose",
  },
  {
    name: "Faculty Members",
    value: "32",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    color: "amber",
  },
  {
    name: "Students",
    value: "986",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        />
      </svg>
    ),
    color: "green",
  },
]

const recentActivities = [
  { id: 1, user: "Dr. Smith", action: "Created a new course", time: "2 hours ago" },
  { id: 2, user: "Admin", action: "Added 5 new faculty members", time: "5 hours ago" },
  { id: 3, user: "System", action: "Backup completed successfully", time: "1 day ago" },
  { id: 4, user: "Jane Doe", action: "Generated semester reports", time: "2 days ago" },
]

function SuperadminDashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState("")
  const [isSystemStatusOpen, setIsSystemStatusOpen] = useState(false)
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false)
  const [stats, setStats] = useState({
    totalUsers: 1024,
    activeCourses: 48,
    facultyMembers: 32,
    students: 986,
    totalRevenue: 0,
    systemHealth: "Good",
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)

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
        ])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Redirect if not superadmin
  if (currentUser?.role !== "superadmin") {
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

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/admin/login")
    } catch (error) {
      console.error("Failed to log out:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary">Superadmin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2">
              {/* Calendar Link */}
              <button
                onClick={() => navigate("/admin/calendar")}
                className="p-2 text-gray-600 hover:text-primary focus:outline-none"
                aria-label="Calendar"
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="h-5 w-5" />
              </button>

              {/* Chat Link */}
              <button
                onClick={() => navigate("/admin/chat")}
                className="p-2 text-gray-600 hover:text-primary focus:outline-none"
                aria-label="Chat"
              >
                <FontAwesomeIcon icon={faComments} className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 hover:text-primary focus:outline-none"
                  aria-label="Notifications"
                >
                  <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-2 text-sm text-gray-500">No new notifications</div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-500">{notification.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-primary focus:outline-none"
                aria-label="Logout"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

    <div className="container mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-dark to-dark-light text-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
              <h1 className="text-3xl font-bold mb-2 text-primary">
              {greeting}, {currentUser.name}
            </h1>
            <p className="text-white text-opacity-90">Welcome to your system overview</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={() => setIsSystemStatusOpen(true)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
              >
              System Status
            </button>
              <button
                onClick={() => setIsGenerateReportOpen(true)}
                className="px-4 py-2 bg-white text-dark rounded-md hover:bg-gray-100 transition-colors duration-200"
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
    </div>
  )
}

export default SuperadminDashboard
