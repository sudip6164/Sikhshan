"use client"
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Sidebar from "../components/navigation/Sidebar"

function AdminLayout() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  // Redirect to admin login if not authenticated as admin
  if (!currentUser || currentUser.role !== "superadmin") {
    return <Navigate to="/admin/login" replace />
  }

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Admin Header */}
        <header className="bg-white shadow sticky top-0 z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="text-primary">Admin</span> Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout 