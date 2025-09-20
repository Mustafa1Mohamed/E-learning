import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import Title from "../../components/Title";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Courses() {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir();

  // get theme from redux
  const theme = useSelector((state) => state.combineTheme.theme);
  const themeBg = theme === "Dark" ? "bg-gray-800" : "bg-gray-50";
  const themeText = theme === "Dark" ? "text-white" : "text-gray-900";

  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const coursesPerPage = 6;

  const API_URL = "https://retoolapi.dev/dL2nNn/data";

  // Fetch courses: use filter endpoint when there's a search term,
  // otherwise use pagination endpoint (_page & _limit).
  const fetchCourses = async (page, query = "") => {
    try {
      const url = query
        ? `${API_URL}?course_name_like=${query}`
        : `${API_URL}?_page=${page}&_limit=${coursesPerPage}`;

      const res = await axios.get(url);

      setCourses(res.data);

      // Get total items count from headers and calculate total pages
      const totalItems = res.headers["x-total-count"];
      if (totalItems) {
        setTotalPages(Math.ceil(totalItems / coursesPerPage));
      } else {
        // if using filter endpoint (no header), set pages to 1
        if (query) setTotalPages(1);
      }
    } catch (err) {
      console.log("API Error:", err);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={`${themeBg} ${themeText} py-6 px-16 min-h-screen`}>
      <div className="container mx-auto px-4 pt-24">
        <Title />

        {/* Search input under the nav */}
        <div className="mb-6">
          <input
            type="text"
            placeholder={t("Search courses...")}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // setCurrentPage(1); // reset to first page when searching
            }}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeBg} ${themeText}`}
          />
        </div>

        {/* Courses */}
        <div
          dir={direction}
          className="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <Card
                key={course.id}
                id={course.id}
                course_name={t(course.course_name)}
                course_plan={t(course.course_plan)}
                course_image={course.course_image}
                course_price={course.course_price}
                path={`/courses/${course.id}`}
                isFavoritesPage={false}
              />
            ))
          ) : (
            <p className="text-gray-500">{t("No courses found.")}</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            {/* Previous */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-gray-300 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {t("Previous")}
            </button>

            {/* Page Numbers (show only 3 at a time) */}
            {(() => {
              let startPage = Math.max(1, currentPage - 1);
              let endPage = Math.min(totalPages, startPage + 2);

              if (endPage - startPage < 2) {
                startPage = Math.max(1, endPage - 2);
              }

              const pages = [];
              for (let page = startPage; page <= endPage; page++) {
                pages.push(
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded-lg border ${
                      currentPage === page
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "text-gray-300 border-gray-300 "
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              return pages;
            })()}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-gray-300 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {t("Next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;












