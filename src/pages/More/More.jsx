import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const More = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios
      .get(`https://retoolapi.dev/dL2nNn/data/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.log("API Error:", err));

    const generatedLessons = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Lesson ${i + 1}`,
      duration: `${10 + i * 2} min`,
      isCompleted: false,
    }));

    setLessons(generatedLessons);
  }, [id]);

  const handleComplete = (lessonId) => {
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson
      )
    );
  };

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-24 min-h-screen bg-gray-50">
      {/* Course details */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img
            src={course.course_image}
            alt={course.course_name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div className="md:w-2/3 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{course.course_name}</h2>
          <p className="text-gray-600 mb-2">{course.course_plan}</p>
          <p className="text-gray-700">{course.course_description}</p>
        </div>
      </div>

      {/* Lessons */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Lessons</h2>
      <div className="space-y-4 mb-8">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${
                  lesson.isCompleted ? "bg-green-500" : "bg-indigo-500"
                }`}
              >
                {lesson.id}
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-800">{lesson.title}</h2>
                <p className="text-sm text-gray-500">{lesson.duration}</p>
              </div>
            </div>

            <button
              onClick={() => handleComplete(lesson.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                lesson.isCompleted
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-500 text-white hover:bg-indigo-400"
              }`}
              disabled={lesson.isCompleted}
            >
              {lesson.isCompleted ? "Completed" : "Start"}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/MyCourses")}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
        >
          Back to My Courses
        </button>
      </div>
    </div>
  );
};

export default More;
