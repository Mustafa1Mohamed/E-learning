import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import GlobalMessage from "../../components/GlobalMessage";

export default function AdminPanel() {
  const admin=JSON.parse(localStorage.getItem("admin"));
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();
  const API_URL = "https://retoolapi.dev/dL2nNn/data";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Delete confirmation
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 10;

  // Add/Edit state
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_plan: "",
    course_price: "",
    course_image: ""
  });

  // Fetch courses
  const fetchCourses = async (page, query = "") => {
    setLoading(true);
    try {
      let url = query
        ? `${API_URL}?course_name_like=${query}&_page=${page}&_limit=${coursesPerPage}`
        : `${API_URL}?_page=${page}&_limit=${coursesPerPage}`;

      const res = await axios.get(url);
      setCourses(res.data);

      if (!query) {
        const totalItems = res.headers["x-total-count"];
        setTotalPages(Math.ceil(totalItems / coursesPerPage));
      } else {
        setTotalPages(1);
      }

      setLoading(false);
    } catch (err) {
      setError(t("Failed to fetch courses"));
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!admin){
      window.location.href="/login";
    }
    fetchCourses(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  // Handle input changes
  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  // Handle GlobalMessage close
  const handleClose = () => {
    setError(null);
    setMessage(null);
  };

  // Add course
  const handleAdd = async () => {
    if (!courseData.course_name || !courseData.course_price) {
      setError(t("Please fill in all fields"));
      return;
    }

    try {
      await axios.post(API_URL, courseData);
      setCourseData({ course_name: "", course_plan: "", course_price: "", course_image: "" });
      setMessage(t("Course added successfully"));
      fetchCourses(currentPage, searchTerm);
    } catch (err) {
      setError(t("Error adding course"));
    }
  };

  // Edit course
  const handleEdit = (course) => {
    setEditingCourse(course.id);
    setCourseData(course);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editingCourse}`, courseData);
      setEditingCourse(null);
      setCourseData({ course_name: "", course_plan: "", course_price: "", course_image: "" });
      setMessage(t("Course updated successfully"));
      fetchCourses(currentPage, searchTerm);
    } catch (err) {
      setError(t("Error updating course"));
    }
  };

  // Delete course (show confirm message instead of window.confirm)
  const handleDeleteRequest = (id) => {
    setPendingDeleteId(id);
    setConfirmMessage(t("Are you sure you want to delete this course?"));
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${pendingDeleteId}`);
      setMessage(t("Course deleted successfully"));
      fetchCourses(currentPage, searchTerm);
    } catch (err) {
      setError(t("Error deleting course"));
    } finally {
      setPendingDeleteId(null);
      setConfirmMessage(null);
    }
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
    setConfirmMessage(null);
  };

  // Change page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-gray-50 py-10 px-6 min-h-screen" dir={direction}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">{t("Admin Panel")}</h1>

        {error && (
          <GlobalMessage type="error" message={t(error)} onClose={handleClose} />
        )}
        {message && (
          <GlobalMessage type="success" message={t(message)} onClose={handleClose} />
        )}
        {confirmMessage && (
          <GlobalMessage
            type="error"
            message={
              <div className="flex flex-col gap-2">
                <span>{confirmMessage}</span>
                <div className="flex gap-2">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    {t("Yes")}
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    {t("No")}
                  </button>
                </div>
              </div>
            }
            onClose={cancelDelete}
          />
        )}

        {/* Add/Edit Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingCourse ? t("Edit Course") : t("Add New Course")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="course_name"
              value={courseData.course_name}
              onChange={handleChange}
              placeholder={t("Course Name")}
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="text"
              name="course_plan"
              value={courseData.course_plan}
              onChange={handleChange}
              placeholder={t("Course Plan")}
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="number"
              name="course_price"
              value={courseData.course_price}
              onChange={handleChange}
              placeholder={t("Course Price")}
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="text"
              name="course_image"
              value={courseData.course_image}
              onChange={handleChange}
              placeholder={t("Image URL")}
              className="border p-2 rounded-lg w-full"
            />
          </div>

          {editingCourse ? (
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              {t("Update Course")}
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              {t("Add Course")}
            </button>
          )}
        </div>

        {/* Courses Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t("All Courses")}</h2>

          <div className="mb-4">
            <input
              type="text"
              placeholder={t("Search by Course Name")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border p-2 rounded-lg w-full md:w-1/3 lg:w-100"
            />
          </div>

          {loading ? (
            <p>{t("Loading...")}</p>
          ) : courses.length === 0 ? (
            <p>{t("No courses found.")}</p>
          ) : (
            <>
              <table className="w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">{t("ID")}</th>
                    <th className="p-2 border">{t("Name")}</th>
                    <th className="p-2 border">{t("Plan")}</th>
                    <th className="p-2 border">{t("Price")}</th>
                    <th className="p-2 border">{t("Image")}</th>
                    <th className="p-2 border">{t("Actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="p-2 border">{course.id}</td>
                      <td className="p-2 border">{t(course.course_name)}</td>
                      <td className="p-2 border">{t(course.course_plan)}</td>
                      <td className="p-2 border">{course.course_price}</td>
                      <td className="p-2 border">
                        {course.course_image ? (
                          <img
                            src={course.course_image}
                            alt={course.course_name}
                            className="w-16 h-16 object-cover"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td className="p-2 border space-x-2 flex justify-center gap-2 align-middle pb-5 pt-7">
                        <button
                          onClick={() => handleEdit(course)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          {t("Edit")}
                        </button>
                        <button
                          onClick={() => handleDeleteRequest(course.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          {t("Delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded border ${currentPage === 1
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-gray-200"
                      }`}
                  >
                    {t("Previous")}
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => goToPage(index + 1)}
                      className={`px-3 py-1 rounded border ${currentPage === index + 1
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "text-gray-700 border-gray-300 hover:bg-gray-200"
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded border ${currentPage === totalPages
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-gray-200"
                      }`}
                  >
                    {t("Next")}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
