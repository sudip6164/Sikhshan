import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"

function StudentProfile() {
  const { currentUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [editedProfile, setEditedProfile] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
    gender: currentUser?.gender || "",
    dateOfBirth: currentUser?.dateOfBirth || "",
  })

  // Student data from currentUser
  const [student, setStudent] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    degree: currentUser?.degree || "",
    year: currentUser?.year || "",
    semester: currentUser?.semester || "",
    rollNumber: currentUser?.rollNumber || "",
    department: currentUser?.department || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
    dob: currentUser?.dob || "",
    gender: currentUser?.gender || "",
    guardian: currentUser?.guardian || "",
    nationality: currentUser?.nationality || "",
  })

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New Assignment Posted",
      message: "CS101 - Assignment 3 has been posted",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Assignment Due Reminder",
      message: "CS201 - Project submission due in 2 days",
      time: "1 day ago",
      isRead: true,
    },
    {
      id: 3,
      title: "Grade Posted",
      message: "Your grade for CS101 - Assignment 2 has been posted",
      time: "3 days ago",
      isRead: true,
    },
  ]

  // Mock assignments data
  const pendingAssignments = [
    {
      id: 1,
      title: "CS101 - Assignment 3",
      course: "Introduction to Computer Science",
      dueDate: "2024-03-20",
      status: "Not Started",
    },
    {
      id: 2,
      title: "CS201 - Project",
      course: "Data Structures and Algorithms",
      dueDate: "2024-03-25",
      status: "In Progress",
    },
  ]

  const completedAssignments = [
    {
      id: 3,
      title: "CS101 - Assignment 2",
      course: "Introduction to Computer Science",
      submittedDate: "2024-03-10",
      grade: "A",
    },
    {
      id: 4,
      title: "CS201 - Midterm Project",
      course: "Data Structures and Algorithms",
      submittedDate: "2024-03-05",
      grade: "B+",
    },
  ]

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileEdit = () => {
    setIsEditingProfile(true)
  }

  const handleProfileSave = () => {
    setIsEditingProfile(false)
    setProfileImage(null)
    setPreviewImage(null)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || "",
      gender: currentUser?.gender || "",
      dateOfBirth: currentUser?.dateOfBirth || "",
    })
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const renderProfileSection = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Image Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold">
              {editedProfile.name?.charAt(0) || "U"}
            </div>
          )}
          {isEditing && (
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        {isEditing && (
          <p className="mt-2 text-sm text-gray-500">
            Click the camera icon to change your profile picture
          </p>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          ) : (
            <p className="mt-1 text-gray-900">{editedProfile.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          ) : (
            <p className="mt-1 text-gray-900">{editedProfile.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={editedProfile.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          ) : (
            <p className="mt-1 text-gray-900">{editedProfile.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={editedProfile.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          ) : (
            <p className="mt-1 text-gray-900">{editedProfile.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          {isEditing ? (
            <select
              name="gender"
              value={editedProfile.gender}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="mt-1 text-gray-900">{editedProfile.gender}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              name="dateOfBirth"
              value={editedProfile.dateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          ) : (
            <p className="mt-1 text-gray-900">{editedProfile.dateOfBirth}</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Notifications</h2>
        <Link
          to="/notifications"
          className="text-primary hover:text-primary-dark transition-colors duration-200"
        >
          View All Notifications
        </Link>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              notification.isRead ? "bg-white" : "bg-primary bg-opacity-5"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                <p className="text-gray-600 mt-1">{notification.message}</p>
              </div>
              <span className="text-sm text-gray-500">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAssignmentsSection = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Assignments</h2>
        <Link
          to="/assignments"
          className="text-primary hover:text-primary-dark transition-colors duration-200"
        >
          View All Assignments
        </Link>
      </div>
      <div className="space-y-4">
        {pendingAssignments.map((assignment) => (
          <div key={assignment.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                <p className="text-gray-600 mt-1">{assignment.course}</p>
                <p className="text-sm text-gray-500 mt-2">Due: {assignment.dueDate}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  assignment.status === "Not Started"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {assignment.status}
                </span>
                <Link
                  to="/assignments"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
                >
                  Submit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4 bg-white rounded-lg shadow p-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "profile"
                ? "bg-primary text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Profile
          </button>
        </div>
      </div>

      {activeTab === "profile" && renderProfileSection()}
    </div>
  )
}

export default StudentProfile 