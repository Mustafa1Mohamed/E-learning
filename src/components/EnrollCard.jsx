import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse, unenrollCourse } from "../Store/actions/EnrolledCoursesAction";
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  id,
  course_name,
  course_plan,
  course_image,
  course_price,
  course_description,
  path,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const enrolledCourses = useSelector((state) => state.EnrolledCoursesReducer.enrolled);
  const isEnrolled = enrolledCourses.some((course) => course.id === id);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEnroll = () => {
    dispatch(enrollCourse({ id, course_name, course_plan, course_image, course_price, course_description }));
  };

  const handleConfirmUnenroll = () => {
    dispatch(unenrollCourse({ id }));
    closeModal();
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative">
        <img src={course_image} alt={course_name} className="h-48 w-full object-cover" />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 justify-between">
        <div className="flex items-center justify-between mt-2">
          <h3 className="text-lg font-bold text-gray-900 cursor-pointer" onClick={() => navigate(path)}>
            {course_name}
          </h3>
          {course_price && <p className="text-lg font-medium text-indigo-600">${course_price}</p>}
        </div>

        {course_description && <p className="text-sm line-clamp-3 mt-2 text-gray-500">{course_description}</p>}
        {course_plan && <p className="text-sm font-medium my-1 text-gray-700">{course_plan}</p>}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5">
          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Enroll Course
            </button>
          ) : (
            <button
              onClick={openModal}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Unenroll
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm</h2>
            <p className="mb-6">Are you sure you want to unenroll from this course?</p>
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
}
