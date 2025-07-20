"use client"

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

// Mock data
const enrolledCourses = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS101",
    instructor: "Dr. Smith",
    progress: 75,
    description: "An introductory course covering the basics of computer science and programming.",
    startDate: "Jan 15, 2023",
    endDate: "May 30, 2023",
    grade: "A-",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 2,
    name: "Data Structures and Algorithms",
    code: "CS201",
    instructor: "Dr. Johnson",
    progress: 45,
    description: "A comprehensive study of data structures and algorithms with practical implementations.",
    startDate: "Jan 15, 2023",
    endDate: "May 30, 2023",
    grade: "B+",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    name: "Database Management Systems",
    code: "CS301",
    instructor: "Prof. Williams",
    progress: 60,
    description: "Covers database design, implementation, and management principles.",
    startDate: "Jan 15, 2023",
    endDate: "May 30, 2023",
    grade: "In Progress",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
]

const availableCourses = [
  {
    id: 4,
    name: "Web Development",
    code: "CS401",
    instructor: "Dr. Brown",
    credits: 3,
    description: "Learn modern web development techniques and frameworks.",
    startDate: "Aug 15, 2023",
    endDate: "Dec 20, 2023",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 5,
    name: "Machine Learning",
    code: "CS501",
    instructor: "Dr. Davis",
    credits: 4,
    description: "Introduction to machine learning algorithms and applications.",
    startDate: "Aug 15, 2023",
    endDate: "Dec 20, 2023",
    image:
      "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
]

const previousCourses = [
  {
    id: "CS100",
    title: "Introduction to Programming",
    code: "CS100",
    semester: "Spring 2023",
    grade: "A",
    instructor: "Dr. Sarah Johnson",
    credits: 3,
    status: "Completed"
  },
  {
    id: "CS103",
    title: "Algorithms",
    code: "CS103",
    semester: "Spring 2024",
    grade: "A-",
    instructor: "Dr. Emily Davis",
    credits: 4,
    status: "Completed"
  },
  {
    id: "CS104",
    title: "Database Systems",
    code: "CS104",
    semester: "Spring 2024",
    grade: "B+",
    instructor: "Prof. Robert Wilson",
    credits: 3,
    status: "Completed"
  }
]

function CourseListStudent() {
  const { currentUser } = useAuth()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [activeTab, setActiveTab] = useState("enrolled")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if not student
  if (currentUser?.role !== "STUDENT") {
    return <div className="text-center p-8">You don't have permission to view this page.</div>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Courses</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "enrolled" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("enrolled")}
        >
          Enrolled Courses
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "available" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("available")}
        >
          Available Courses
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === "previous" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("previous")}
        >
          Previous Courses
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course List */}
        <div className="lg:col-span-2">
          {activeTab === "previous" ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previousCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-500">{course.code}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.semester}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.instructor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.credits}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            course.grade === "A" ? "bg-green-100 text-green-800" :
                            course.grade === "B+" ? "bg-blue-100 text-blue-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {course.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {course.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTab === "enrolled"
                ? enrolledCourses.map((course) => (
                    <div
                      key={course.id}
                      className={`bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                        selectedCourse?.id === course.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedCourse(course)}
                    >
                      <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${course.image})` }}>
                        <div className="h-full w-full bg-black bg-opacity-30 flex items-end p-4">
                          <div>
                            <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-md mb-2">
                              {course.code}
                            </span>
                            <h3 className="text-lg font-bold text-white">{course.name}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : availableCourses.map((course) => (
                    <div
                      key={course.id}
                      className={`bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
                        selectedCourse?.id === course.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedCourse(course)}
                    >
                      <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${course.image})` }}>
                        <div className="h-full w-full bg-black bg-opacity-30 flex items-end p-4">
                          <div>
                            <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-md mb-2">
                              {course.code}
                            </span>
                            <h3 className="text-lg font-bold text-white">{course.name}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <p className="text-sm text-gray-600">
                            {course.startDate} - {course.endDate}
                          </p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary bg-opacity-10 text-primary">
                            {course.credits} Credits
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>

        {/* Course Details */}
        {activeTab !== "previous" && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {selectedCourse ? (
              <div>
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${selectedCourse.image})` }}>
                  <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-md mb-2">
                        {selectedCourse.code}
                      </span>
                      <h2 className="text-2xl font-bold">{selectedCourse.name}</h2>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Instructor</p>
                      <p className="text-base text-gray-900">{selectedCourse.instructor}</p>
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
                    {activeTab === "enrolled" && (
                      <>
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
                        <div>
                          <p className="text-sm font-medium text-gray-500">Current Grade</p>
                          <p className="text-base text-gray-900">{selectedCourse.grade}</p>
                        </div>
                      </>
                    )}
                    {activeTab === "available" && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Credits</p>
                        <p className="text-base text-gray-900">{selectedCourse.credits}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    {activeTab === "enrolled" ? (
                      <>
                        <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200">
                          View Course Materials
                        </button>
                        <button className="w-full py-2 border border-primary text-primary rounded-md hover:bg-primary-light/10 transition-colors duration-200">
                          View Assignments
                        </button>
                        <button className="w-full py-2 border border-primary text-primary rounded-md hover:bg-primary-light/10 transition-colors duration-200">
                          View Quizzes
                        </button>
                      </>
                    ) : (
                      <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200">
                        Enroll in Course
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-2">Select a course to view details</p>
                  <p className="text-sm text-gray-400">Click on any course card to see more information</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseListStudent
