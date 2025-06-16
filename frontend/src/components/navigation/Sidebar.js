"use client"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useState } from "react"
import logo from "../../assets/images/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChartLine,
  faBook,
  faFileAlt,
  faQuestionCircle,
  faComments,
  faCalendarAlt,
  faShieldAlt
} from "@fortawesome/free-solid-svg-icons"

function Sidebar() {
  const { currentUser } = useAuth()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  // Define navigation items based on user role
  const getNavItems = () => {
    const role = currentUser?.role

    const commonItems = [
      { name: "Chat", path: "/chat", icon: "chat" },
      { name: "Calendar", path: "/calendar", icon: "calendar" },
    ]

    if (role === "superadmin") {
      return [{ name: "Dashboard", path: "/superadmin", icon: "dashboard" }, ...commonItems]
    } else if (role === "faculty") {
      return [
        { name: "Dashboard", path: "/faculty", icon: "dashboard" },
        { name: "Courses", path: "/faculty/courses", icon: "book" },
        { name: "Assignments", path: "/faculty/assignments", icon: "assignment" },
        { name: "Quizzes", path: "/faculty/quizzes", icon: "quiz" },
        ...commonItems,
      ]
    } else if (role === "student") {
      return [
        { name: "Dashboard", path: "/student", icon: "dashboard" },
        { name: "Courses", path: "/student/courses", icon: "book" },
        { name: "Submit Assignment", path: "/student/assignments/submit", icon: "assignment" },
        { name: "Take Quiz", path: "/student/quizzes/attempt", icon: "quiz" },
        { name: "Plagiarism Check", path: "/student/plagiarism", icon: "security" },
        ...commonItems,
      ]
    }

    return []
  }

  const navItems = getNavItems()

  // Simple icon component (using Font Awesome icons)
  const Icon = ({ name }) => {
    const iconMap = {
      dashboard: faChartLine,
      book: faBook,
      assignment: faFileAlt,
      quiz: faQuestionCircle,
      chat: faComments,
      calendar: faCalendarAlt,
      security: faShieldAlt,
    }

    return <FontAwesomeIcon icon={iconMap[name] || faFileAlt} className="mr-3 w-5 h-5" />
  }

  return (
    <div
      className={`bg-white text-gray-800 ${
        collapsed ? "w-20" : "w-64"
      } space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
        collapsed ? "-translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}
    >
      <div className="flex items-center justify-center px-4">
        {!collapsed && (
          <img
            src={logo}
            alt="Sikhshan Logo"
            className="h-36 w-auto object-contain -my-8"
          />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-2 p-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200 md:hidden"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${
              location.pathname === item.path
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            } ${collapsed ? "justify-center" : ""}`}
          >
            <Icon name={item.icon} />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="px-4 mt-auto">
        <div className="pt-4 border-t border-gray-200">
          {!collapsed && (
            <div className="text-sm text-gray-600">
              <p>Logged in as:</p>
              <p className="font-medium text-gray-900">{currentUser?.name}</p>
              <p className="capitalize">{currentUser?.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
