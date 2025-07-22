import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, deleteUser } from "../../api/adminUserApi";

function UserDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await getUserById(userId);
        setUser(res.data);
      } catch (err) {
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        navigate("/admin/users", { state: { success: "User deleted successfully." } });
      } catch (err) {
        setError("Failed to delete user.");
      }
    }
  };

  // Helper to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date)) return "-";
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">{error}</div>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-primary text-white rounded">Back</button>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">User Details</h1>
        <div className="mb-4">
          <span className="font-medium text-gray-700">Name:</span> {user.name}
        </div>
        <div className="mb-4">
          <span className="font-medium text-gray-700">Email:</span> {user.email}
        </div>
        <div className="mb-4">
          <span className="font-medium text-gray-700">Role:</span> {user.role}
        </div>
        <div className="mb-4">
          <span className="font-medium text-gray-700">Status:</span> {user.status}
        </div>
        <div className="mb-4">
          <span className="font-medium text-gray-700">Created At:</span> {formatDate(user.createdAt)}
        </div>
        <div className="mb-4">
          <span className="font-medium text-gray-700">User ID:</span> {user.id}
        </div>
        {/* Add more user details here if available */}
        <div className="flex space-x-2 mt-6">
          <button
            onClick={() => navigate(`/admin/users/edit/${user.id}`)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={() => navigate('/admin/users')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetails; 