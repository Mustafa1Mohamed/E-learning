import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unenrollCourse } from "../../Store/actions/EnrolledCoursesAction";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyCourses = () => {
  const theme = useSelector((state) => state.combineTheme.theme);
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();
  const courses = useSelector((state) => state.EnrolledCoursesReducer.enrolled);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCourse(null);
    setIsModalOpen(false);
  };

  const handleConfirmUnenroll = () => {
    if (selectedCourse) {
      dispatch(unenrollCourse(selectedCourse));
      closeModal();
    }
  };

  return (
    <div
      dir={direction}
      className={`pt-32 px-8 min-h-screen ${theme === "Dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t("My Courses")}
      </h1>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-lg font-medium">{t("No courses enrolled yet")}</p>
          <p className="text-sm opacity-70 mt-1">
            {t("Start enrolling to see your courses here!")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`shadow-lg rounded-xl p-5 cursor-pointer hover:shadow-xl transition ${theme === "Dark"
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
                }`}
              onClick={() => navigate(`/more/${course.id}`)}
            >
              <img
                src={course.course_image}
                alt={course.course_name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg">{t(course.course_name)}</h3>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(course);
                }}
                className="mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                {t("Unenroll")}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 w-80 text-center shadow-lg ${theme === "Dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
          >
            <h2 className="text-xl font-semibold mb-4">{t("Confirm")}</h2>
            <p className="mb-6">
              {t("Are you sure you want to unenroll from this course?")}
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleConfirmUnenroll}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
              >
                {t("Yes")}
              </button>
              <button
                onClick={closeModal}
                className={`py-2 px-4 rounded-lg ${theme === "Dark"
                    ? "bg-gray-600 text-white hover:bg-gray-500"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                  }`}
              >
                {t("Cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
