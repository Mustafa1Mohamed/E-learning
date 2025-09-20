import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unenrollCourse } from "../../Store/actions/EnrolledCoursesAction";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
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
    <div className="pt-32 px-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-indigo-500 mb-6 text-center">My Courses</h1>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-600">
          <p className="text-lg font-medium">No courses enrolled yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Start enrolling to see your courses here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-lg rounded-xl p-5 cursor-pointer hover:shadow-xl transition"
              onClick={() => navigate(`/more/${course.id}`)}
            >
              <img
                src={course.course_image}
                alt={course.course_name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg">{course.course_name}</h3>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(course);
                }}
                className="mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Unenroll
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm</h2>
            <p className="mb-6">
              Are you sure you want to unenroll from this course?
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleConfirmUnenroll}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
