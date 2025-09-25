import React from "react";
import { useSelector } from "react-redux";

function AddCourseModal({ onClose, onSubmit, previewImage, setPreviewImage, handleFileChange }) {
  const theme = useSelector((state) => state.combineTheme?.theme ?? "Light");

  
  const cardClass = theme === "Dark" ? "bg-gray-800 text-white" : "bg-white text-black";
  const textClass = theme === "Dark" ? "text-white" : "text-black";
  const inputClass =
    theme === "Dark"
      ? "w-full border px-4 py-2 rounded bg-gray-800 text-white"
      : "w-full border px-4 py-2 rounded bg-white text-black";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className={`${cardClass} rounded-lg shadow-lg w-full max-w-lg p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-indigo-500">Add New Course</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <input
            type="text"
            name="course_name"
            placeholder="Course Name"
            className={inputClass}
            required
          />
          <select className={inputClass} name="course_plan" required>
            <option>Pro Plan</option>
            <option>Pro Basic</option>
            <option>Free Plan</option>
            <option>Enterprise Plan</option>
            <option>Trial</option>
          </select>
          <input
            type="number"
            name="course_price"
            placeholder="Course Price"
            className={inputClass}
            required
          />
          <textarea
            placeholder="Course Description"
            name="course_description"
            className={inputClass}
            required
          />
          <input
            type="file"
            name="course_image"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setPreviewImage)}
            className={inputClass}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-24 h-20 mt-2 object-cover rounded"
            />
          )}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCourseModal;

