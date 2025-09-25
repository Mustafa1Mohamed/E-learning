import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddCourseModal from "./AddCourseModal";
import EditCourseModal from "./EditCourseModal";

function AdminPanal() {
  const theme = useSelector((state) => state.combineTheme?.theme ?? "Light");

  //  Theme classes
  const bgClass = theme === "Dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black";
  const cardClass = theme === "Dark" ? "bg-gray-800 text-white" : "bg-white text-black";
  const tableHeadClass = theme === "Dark" ? "bg-gray-700 text-white" : "bg-indigo-500 text-white";
  const textClass = theme === "Dark" ? "text-white" : "text-black";
  const subTextClass = theme === "Dark" ? "text-gray-300" : "text-gray-700";

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);
  const [editPreviewImage, setEditPreviewImage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch courses
  useEffect(() => {
    fetch("https://retoolapi.dev/dL2nNn/data")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Add Course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newCourse = {
      course_name: formData.get("course_name"),
      course_plan: formData.get("course_plan"),
      course_price: formData.get("course_price"),
      course_description: formData.get("course_description"),
      course_image: previewImage,
    };

    try {
      const res = await fetch("https://api-generator.retool.com/dL2nNn/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });

      const savedCourse = await res.json();
      setCourses([...courses, savedCourse]);
      setIsAddOpen(false);
      setPreviewImage(null);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Edit Course
  const openEditModal = (course) => {
    setEditingCourse(course);
    setEditPreviewImage(course.course_image);
    setIsEditOpen(true);
  };

  const handleEditCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedCourse = {
      ...editingCourse,
      course_name: formData.get("course_name"),
      course_plan: formData.get("course_plan"),
      course_price: formData.get("course_price"),
      course_description: formData.get("course_description"),
      course_image: editPreviewImage,
    };

    try {
      const res = await fetch(
        `https://retoolapi.dev/dL2nNn/data/${editingCourse.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCourse),
        }
      );

      const savedCourse = await res.json();
      setCourses(courses.map((c) => (c.id === savedCourse.id ? savedCourse : c)));
      setIsEditOpen(false);
      setEditingCourse(null);
      setEditPreviewImage(null);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Delete Course
  const handleDeleteCourse = async (id) => {
    try {
      await fetch(`https://retoolapi.dev/dL2nNn/data/${id}`, {
        method: "DELETE",
      });
      setCourses(courses.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Handle File Change
  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <div className={`flex min-h-screen ${bgClass}`}>
      {/* Sidebar */}
      <aside className={`w-64 flex flex-col mt-20 ${cardClass}`}>
        <div className="p-6 text-2xl font-bold text-indigo-500 mt-5">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className={`block px-4 py-2 rounded w-full text-left hover:bg-indigo-500 hover:text-white ${textClass}`}>
            Home
          </button>
          <button className={`block px-4 py-2 rounded w-full text-left hover:bg-indigo-500 hover:text-white ${textClass}`}>
            Courses
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 mt-20">
        <div className="flex items-center justify-between mb-6">
          <h4 className={`text-sm font-bold ${subTextClass}`}>Admin Panel / Home</h4>
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
          >
            Add New Course
          </button>
        </div>

        {/* Courses Table */}
        <div className={`overflow-x-auto rounded-lg shadow ${cardClass}`}>
          <table className="w-full border-collapse min-w-[700px]">
            <thead className={tableHeadClass}>
              <tr>
                <th className="px-4 py-2 text-left">Course Name</th>
                <th className="px-4 py-2 text-left">Course Plan</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.length > 0 ? (
                currentCourses.map((course) => (
                  <tr
                    key={course.id}
                    className={`border-b ${textClass}`}
                  >
                    <td className="px-4 py-2">{course.course_name}</td>
                    <td className="px-4 py-2">{course.course_plan}</td>
                    <td className="px-4 py-2">${course.course_price}</td>
                    <td
                      className="px-4 py-2 max-w-[250px] truncate"
                      title={course.course_description}
                    >
                      {course.course_description}
                    </td>
                    <td className="px-4 py-2">
                      {course.course_image && (
                        <img
                          src={course.course_image}
                          alt={course.course_name}
                          className="w-20 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => openEditModal(course)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={`text-center py-4 ${subTextClass}`}>
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
{totalPages > 1 && (
  <div className="flex justify-center items-center mt-4 space-x-2">
    {/* Prev */}
    <button
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-3 py-1 rounded disabled:opacity-50 ${
        theme === "Dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      Prev
    </button>

    {/* Numbers */}
    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => goToPage(index + 1)}
        className={`px-3 py-1 rounded ${
          currentPage === index + 1
            ? "bg-indigo-500 text-white"
            : theme === "Dark"
            ? "bg-gray-800 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {index + 1}
      </button>
    ))}

    {/* Next */}
    <button
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-3 py-1 rounded disabled:opacity-50 ${
        theme === "Dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      Next
    </button>
  </div>
)}

      </main>

      {/* Add & Edit Modals */}
      {isAddOpen && (
        <AddCourseModal
          onClose={() => setIsAddOpen(false)}
          onSubmit={handleAddCourse}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          handleFileChange={handleFileChange}
        />
      )}

      {isEditOpen && editingCourse && (
        <EditCourseModal
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleEditCourse}
          editingCourse={editingCourse}
          editPreviewImage={editPreviewImage}
          setEditPreviewImage={setEditPreviewImage}
          handleFileChange={handleFileChange}
        />
      )}
    </div>
  );
}

export default AdminPanal;






