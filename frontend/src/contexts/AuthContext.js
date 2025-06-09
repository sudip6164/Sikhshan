"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Simulating loading user data from localStorage on app start
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = (email, password, role) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock users for different roles
        if (role === "admin" && email === "admin@example.com" && password === "password") {
          const user = { id: 1, name: "Admin User", email, role: "superadmin" }
          setCurrentUser(user)
          localStorage.setItem("user", JSON.stringify(user))
          resolve(user)
        } else if (role === "faculty" && email === "faculty@example.com" && password === "password") {
          const user = { id: 2, name: "Faculty User", email, role: "faculty" }
          setCurrentUser(user)
          localStorage.setItem("user", JSON.stringify(user))
          resolve(user)
        } else if (role === "student" && email === "student@example.com" && password === "password") {
          const user = { id: 3, name: "Student User", email, role: "student" }
          setCurrentUser(user)
          localStorage.setItem("user", JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error("Invalid email or password for selected role"))
        }
      }, 1000)
    })
  }

  // Logout function
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("user")
  }

  // Reset password function (mock)
  const resetPassword = (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Password reset email sent!" })
      }, 1000)
    })
  }

  const value = {
    currentUser,
    login,
    logout,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
