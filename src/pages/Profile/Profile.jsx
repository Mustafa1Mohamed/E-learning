import React from "react";
import MyCourses from "../MyCourses/Mycourses.jsx";

function Profile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-8 pt-24 text-center">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-red-500 mt-2">No user found. Please log in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <div className="container mx-auto px-8 pt-20">
        {/* User Info */}
        <div className="bg-white text-gray-800 shadow-md rounded-lg p-4 max-w-lg mx-auto text-center">
          <img
            src="https://www.svgrepo.com/show/452030/avatar-default.svg"
            alt="User Avatar"
            className="w-32 h-32 mx-auto rounded-full mb-4 border-2 shadow-md"
          />
          <h1 className="text-2xl font-bold">{currentUser.name}</h1>
          <p className="text-gray-500">{currentUser.email}</p>
        </div>

        {/* My Courses Section */}
        <div className="mt-6">
          <MyCourses />
        </div>
      </div>
    </div>
  );
}

export default Profile;
