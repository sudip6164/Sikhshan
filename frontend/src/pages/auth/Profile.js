import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getProfile, updateProfile, uploadProfilePicture } from "../../api/profileApi";

function StudentProfile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    profilePictureUrl: "",
  });
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [showMessage, setShowMessage] = useState("")
  const [showError, setShowError] = useState("")

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      setLoading(true);
      try {
        const res = await getProfile(currentUser.id);
        setProfile({
          ...res.data,
          dateOfBirth: res.data.dateOfBirth || "",
        });
      } catch (err) {
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [currentUser]);

  // When profile changes, update editedProfile (for cancel/reset)
  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form field changes (edit mode)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile update (save)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);
    try {
      const req = { ...editedProfile };
      delete req.email; // email is not updatable
      delete req.profilePictureUrl;
      const res = await updateProfile(currentUser.id, req);
      setProfile({ ...profile, ...res.data });
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Handle profile picture upload
  const handleFileChange = async (e) => {
    if (!currentUser) return;
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const res = await uploadProfilePicture(currentUser.id, file);
      setProfile((prev) => ({ ...prev, profilePictureUrl: res.data.profilePictureUrl }));
      alert("Profile picture updated successfully");
    } catch (err) {
      alert("Failed to upload profile picture");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit/cancel
  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const renderProfileSection = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
      {showMessage && <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">{showMessage}</div>}
      {showError && <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{showError}</div>}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
        {!isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSubmit}
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