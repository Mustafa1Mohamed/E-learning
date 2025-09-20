import React from "react";
import MyCourses from "../MyCourses/Mycourses.jsx";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Profile() {
  const { t, i18n } = useTranslation()
  const theme = useSelector(state => state.combineTheme.theme);
  const themeBg = theme === 'Dark' ? 'bg-gray-800' : 'bg-gray-50';
  const themeText = theme === 'Dark' ? 'dark:text-white' : '';
  const direction = i18n.dir();
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
    <div dir={direction} className={`${themeBg} ${themeText} min-h-screen mt-3`}>
      <div className="container mx-auto px-8 pt-20">
        <h1 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {t("Your Profile")}
        </h1>
        {/* User Info */}
        <div className={`${themeBg} ${themeText} shadow-md rounded-lg p-4 max-w-lg mx-auto text-center`}>
          <img
            src="https://www.svgrepo.com/show/452030/avatar-default.svg"
            alt="User Avatar"
            className="w-32 h-32 mx-auto rounded-full mb-4 border-2 shadow-md"
          />
          <h1 className="text-2xl font-bold">{currentUser.name}</h1>
          <p className="text-gray-500">{currentUser.email}</p>
        </div>

        {/* My Courses Section */}
        <div className={`mt-1 `}>
          <MyCourses />
        </div>
      </div>
    </div>
  );
}

export default Profile;
