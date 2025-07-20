import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const currentUser = { role: 'FACULTY' }; // Replace with actual user data

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-auto">
              {/* Logo */}
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Other links */}
                {currentUser?.role === "FACULTY" && (
                  <Link
                    to="/faculty/assignments"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Assignments
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 