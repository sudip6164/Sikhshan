import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./App.css"

// Layouts
import MainLayout from "./layouts/MainLayout"
import AdminLayout from "./layouts/AdminLayout"

// Auth Pages
import Login from "./pages/auth/Login"
import AdminLogin from "./pages/auth/AdminLogin"
import PasswordReset from "./pages/auth/PasswordReset"
import StudentProfile from "./pages/auth/Profile"

// Dashboard Pages
import SuperadminDashboard from "./pages/dashboards/SuperadminDashboard"
import FacultyDashboard from "./pages/dashboards/FacultyDashboard"
import StudentDashboard from "./pages/dashboards/StudentDashboard"

// Course Pages
import CourseListFaculty from "./pages/courses/CourseListFaculty"
import CourseListStudent from "./pages/courses/CourseListStudent"
import ViewCourse from "./pages/courses/ViewCourse"

// Assignment Pages
import AssignmentCreation from "./pages/assignments/AssignmentCreation"
import AssignmentSubmission from "./pages/assignments/AssignmentSubmission"
import AssignmentView from "./pages/assignments/AssignmentView"
import CompletedAssignmentView from "./pages/assignments/CompletedAssignmentView"
import AssignmentListFaculty from "./pages/assignments/AssignmentListFaculty"

// Quiz Pages
import QuizAttempt from "./pages/quizzes/QuizAttempt"
import QuizListFaculty from "./pages/quizzes/QuizListFaculty"

// Other Pages
import Chat from "./pages/communication/Chat"
import Calendar from "./pages/calendar/Calendar"
import PlagiarismResults from "./pages/plagiarism/PlagiarismResults"
import AllNotifications from "./pages/notifications/AllNotifications"

// Auth Context
import { AuthProvider } from "./contexts/AuthContext"
import UserManagement from "./pages/admin/UserManagement"
import SystemSettings from "./pages/admin/SystemSettings"
import Reports from "./pages/admin/Reports"
import AuditLogs from "./pages/admin/AuditLogs"
import AddUser from "./pages/admin/AddUser"
import EditUser from "./pages/admin/EditUser"
import Settings from "./pages/Settings"
import ProtectedRoute from "./components/ProtectedRoute"
import Unauthorized from "./pages/Unauthorized"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/reset-password" element={<PasswordReset />} />

          {/* User Settings Route (top-level) */}
          <Route path="/settings" element={<Settings />} />

          {/* Unauthorized Route */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin Routes (superadmin only) */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<SuperadminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="users/add" element={<AddUser />} />
            <Route path="users/edit/:userId" element={<EditUser />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="logs" element={<AuditLogs />} />
            <Route path="chat" element={<Chat />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>

          {/* Faculty Routes (faculty only) */}
          <Route path="/faculty" element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<FacultyDashboard />} />
            <Route path="courses" element={<CourseListFaculty />} />
            <Route path="assignments/create" element={<AssignmentCreation />} />
            <Route path="assignments" element={<AssignmentListFaculty />} />
            <Route path="quizzes" element={<QuizListFaculty />} />
            <Route path="chat" element={<Chat />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>

          {/* Student Routes (student only) */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<CourseListStudent />} />
            <Route path="courses/:courseId" element={<ViewCourse />} />
            <Route path="assignments/submit" element={<AssignmentSubmission />} />
            <Route path="assignments/:id/submit" element={<AssignmentView />} />
            <Route path="assignments/:id/view" element={<CompletedAssignmentView />} />
            <Route path="quizzes/attempt" element={<QuizAttempt />} />
            <Route path="quizzes/:id/view" element={<QuizAttempt />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="notifications" element={<AllNotifications />} />
            <Route path="plagiarism" element={<PlagiarismResults />} />
            <Route path="chat" element={<Chat />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>

          {/* Common Routes (all roles) */}
          {/* <Route path="/chat" element={<Chat />} />
          <Route path="/calendar" element={<Calendar />} /> */}

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
