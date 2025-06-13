"use client"

import React from "react"
import { useAuth } from "../../contexts/AuthContext"

// Mock data
const courses = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS101",
    students: 45,
    progress: 60,
    description: "An introductory course covering the basics of computer science and programming.",
    startDate: "Jan 15, 2023",
    endDate: "May 30, 2023",
  },
  {
    id: 2,
    name: "Data Structures and Algorithms",
    code: "CS201",
    students: 38,
    progress: 40,
    description: "A comprehensive study of data structures and algorithms with practical implementations.",
    startDate: "Jan 15, 2023",
    endDate: "May 30, 2023",
  },
  {
    id: 3,
    name: "Database Management Systems",
    code: "CS301",
    students: 32,
    progress: 75,
    description: "Covers database design, implementation, and management principles.",
    startDate: "Jan 15, 2023",
    endDate: "May 30, 2023",
  },
]

function CourseListFaculty() {
  const { currentUser } = useAuth()
  const [selectedCourse, setSelectedCourse] = React.useState(null)

  // Redirect if not faculty
  if (currentUser?.role !== "faculty") {
    return <div className="text-center p-8">You don't have permission to view this page.</div>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark mt-4 md:mt-0">
          Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">All Courses</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {course.code} • {course.students} Students
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="w-full md:w-32 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{course.progress}% Complete</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="bg-white rounded-lg shadow p-6">
          {selectedCourse ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedCourse.name}</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Course Code</p>
                  <p className="text-base text-gray-900">{selectedCourse.code}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="text-base text-gray-900">{selectedCourse.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="text-base text-gray-900">
                    {selectedCourse.startDate} - {selectedCourse.endDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Enrolled Students</p>
                  <p className="text-base text-gray-900">{selectedCourse.students}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Progress</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${selectedCourse.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{selectedCourse.progress}% Complete</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark">
                  Manage Course
                </button>
                <button className="w-full px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary-50">
                  View Student List
                </button>
                <button className="w-full px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary-50">
                  Create Assignment
                </button>
                <button className="w-full px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary-50">
                  Create Quiz
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Select a course to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseListFaculty
