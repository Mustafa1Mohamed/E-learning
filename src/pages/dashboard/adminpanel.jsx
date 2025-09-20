import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
// import { Description } from "@headlessui/react";

export default function AdminPanel() {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();
  const API_URL = "https://retoolapi.dev/dL2nNn/data";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 5;

  // Add/Edit state
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_plan: "",
    course_price: "",
    course_image: "",
    course_description: "",
  });

  // Fetch courses with pagination & search
  const fetchCourses = async (page, query = "") => {
    setLoading(true);
    try {
      let url = query
        ? `${API_URL}?course_name_like=${query}&_page=${page}&_limit=${coursesPerPage}`
        : `${API_URL}?_page=${page}&_limit=${coursesPerPage}`;

      const res = await axios.get(url);
      console.log(res.data); // Debugging line to inspect fetched data
      setCourses(res.data);

      // Total count header only appears without "like"
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
    fetchCourses(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  // Handle input changes
 const handleChange = (e) => {
  const { name, value, type, files } = e.target;
  if (type === "file") {
    setCourseData({ ...courseData, [name]: files[0] });
  } else {
    setCourseData({ ...courseData, [name]: value });
  }
};


  // Add course
  const handleAdd = async () => {
    if (!courseData.course_name || !courseData.course_price) {
      alert(t("Please fill all required fields"));
      return;
    }
    try {
      await axios.post(API_URL, courseData);
      setCourseData({ course_name: "", course_plan: "", course_price: "", course_image: "" ,course_description: ""});
      fetchCourses(currentPage, searchTerm);
    } catch (err) {
      alert(t("Error adding course"));
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
      setCourseData({ course_name: "", course_plan: "", course_price: "", course_image: "", course_description: "" });
      fetchCourses(currentPage, searchTerm);
    } catch (err) {
      alert(t("Error updating course"));
    }
  };

  // Delete course
  const handleDelete = async (id) => {
    if (window.confirm(t("Are you sure you want to delete this course?"))) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchCourses(currentPage, searchTerm);
      } catch (err) {
        alert(t("Error deleting course"));
      }
    }
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

        {/* Search Box */}

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
              name="course_description"
              value={courseData.course_description}
              onChange={handleChange}
              placeholder={t("Description")}
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
              type="file"
              name="course_image"
              onChange={handleChange}
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
          ) : error ? (
            <p className="text-red-500">{error}</p>
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
                    <th className="p-2 border">{t("Description")}</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className="p-2 border">{course.id}</td>
                      <td className="p-2 border">{course.course_name}</td>
                      <td className="p-2 border">{course.course_plan}</td>
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
                      <td className="p-2 border space-x-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          {t("Edit")}
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          {t("Delete")}
                        </button>
                      </td>
                      <td className="p-2 border">{course.course_description}</td> {/* <-- Add this line */}
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
                    className={`px-3 py-1 rounded border ${
                      currentPage === 1
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
                      className={`px-3 py-1 rounded border ${
                        currentPage === index + 1
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
                    className={`px-3 py-1 rounded border ${
                      currentPage === totalPages
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