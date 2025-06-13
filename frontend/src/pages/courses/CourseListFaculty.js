"use client"

import React, { useState } from "react"
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
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    startDate: "",
    endDate: "",
    maxStudents: "",
  })

  // Redirect if not faculty
  if (currentUser?.role !== "faculty") {
    return <div className="text-center p-8">You don't have permission to view this page.</div>
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Course created:", formData)
    alert("Course created successfully!")

    // Reset form and return to list view
    setFormData({
      name: "",
      code: "",
      description: "",
      startDate: "",
      endDate: "",
      maxStudents: "",
    })
    setIsCreating(false)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark mt-4 md:mt-0"
        >
          {isCreating ? "Back to List" : "Create New Course"}
        </button>
      </div>

      {isCreating ? (
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Name */}
              <div className="col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Course Code */}
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Max Students */}
              <div>
                <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Students
                </label>
                <input
                  type="number"
                  id="maxStudents"
                  name="maxStudents"
                  value={formData.maxStudents}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              {/* End Date */}
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="col-span-2 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Create Course
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
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
                    className={`p-6 hover:bg-gray-50 cursor-pointer ${selectedCourse?.id === course.id ? 'bg-primary-50' : ''}`}
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
          <div>
            {selectedCourse ? (
              <div className="bg-white rounded-lg shadow p-6">
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
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">Select a course to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseListFaculty
