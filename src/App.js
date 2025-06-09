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

// Quiz Pages
import QuizCreation from "./pages/quizzes/QuizCreation"
import QuizAttempt from "./pages/quizzes/QuizAttempt"

// Other Pages
import Chat from "./pages/communication/Chat"
import Calendar from "./pages/calendar/Calendar"
import PlagiarismResults from "./pages/plagiarism/PlagiarismResults"
import AllNotifications from "./pages/notifications/AllNotifications"

// Auth Context
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/reset-password" element={<PasswordReset />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<SuperadminDashboard />} />
            {/* Add more admin routes here */}
          </Route>

          {/* Protected Routes */}
          <Route path="/" element={<MainLayout />}>
            {/* Faculty Routes */}
            <Route path="faculty" element={<FacultyDashboard />} />
            <Route path="faculty/courses" element={<CourseListFaculty />} />
            <Route path="faculty/assignments/create" element={<AssignmentCreation />} />
            <Route path="faculty/quizzes/create" element={<QuizCreation />} />

            {/* Student Routes */}
            <Route path="student" element={<StudentDashboard />} />
            <Route path="student/courses" element={<CourseListStudent />} />
            <Route path="student/courses/:courseId" element={<ViewCourse />} />
            <Route path="student/assignments/submit" element={<AssignmentSubmission />} />
            <Route path="student/assignments/:id/submit" element={<AssignmentView />} />
            <Route path="student/assignments/:id/view" element={<CompletedAssignmentView />} />
            <Route path="student/quizzes/attempt" element={<QuizAttempt />} />
            <Route path="student/quizzes/:id/view" element={<QuizAttempt />} />
            <Route path="student/profile" element={<StudentProfile />} />
            <Route path="student/notifications" element={<AllNotifications />} />
            <Route path="student/plagiarism" element={<PlagiarismResults />} />

            {/* Common Routes */}
            <Route path="chat" element={<Chat />} />
            <Route path="calendar" element={<Calendar />} />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
