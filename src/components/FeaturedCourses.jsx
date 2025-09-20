import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleFav } from "../Store/actions/FavAction";
import { toggleWhishlist } from "../Store/actions/WhishListAction";
import { enrollCourse } from "../Store/actions/EnrolledCoursesAction";

function FeaturedCourses() {
    const [courses, setCourses] = useState([]); 
    
    const [localEnrollment, setLocalEnrollment] = useState({}); 

    const theme = useSelector(state => state.combineTheme.theme);
    const themeBg = theme === 'Dark' ? 'bg-gray-800' : 'bg-white';
    const themeText = theme === 'Dark' ? 'dark:text-white' : '';
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const favorites = useSelector((state) => state.FavReducers.favorites);
    const whishlist = useSelector((state) => state.WhishlistReducer.whishlist);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const enrolledCourses = useSelector((state) => state.EnrolledCoursesReducer.enrolled);
    const isEnrolled = (courseId) => enrolledCourses.some((course) => course.id === courseId);

    useEffect(() => {
        axios
            .get("https://retoolapi.dev/dL2nNn/data")
            .then((res) => setCourses(res.data.slice(0, 2))) // 3 featured courses
            .catch((err) => console.log("API Error:", err));
    }, []);

    const handleToggleFavorite = (course) => {
        if (!currentUser) {
            navigate("/login");
            return;
        }
        dispatch(toggleFav(course));
    };

    const handleToggleWishlist = (course) => {
        if (!currentUser) {
            navigate("/login");
            return;
        }
        dispatch(toggleWhishlist(course));
    };

    return (
        <div className={`px-4 sm:px-12 lg:px-15 py-16 ${themeBg} ${themeText}`}>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto">
                <h2 className={`text-3xl font-bold ${theme === 'Dark' ? 'dark:text-white' : 'text-gray-800'}`}>Featured Courses</h2>
                <button
                    onClick={() => navigate("/courses")}
                    className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition"
                >
                    All Courses
                </button>
            </div>
            {/* Courses Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-8 max-w-6xl mx-auto">
                {courses.map((course) => {
                    const isFavorite = favorites.some((c) => c.id === course.id);
                    const isInWishlist = whishlist.some((c) => c.id === course.id);

                    const coursePayload = {
                        id: course.id,
                        course_name: course.course_name,
                        course_plan: course.course_plan,
                        course_image: course.course_image,
                        course_price: course.course_price,
                        course_description: course.course_description,
                    };

                    const enrolled = localEnrollment[course.id] ?? isEnrolled(course.id); 

                    return (
                        <div
                            key={course.id}
                            className={`rounded-lg shadow-md overflow-hidden flex flex-col border ${theme === 'Dark' ? 'border-gray-500' : ''} ${themeBg} ${themeText}`}
                        >
                            {/* Image with icons */}
                            <div className="relative">
                                <img
                                    src={course.course_image}
                                    alt={course.course_name}
                                    className="w-full h-48 object-cover"
                                />
                                {/* Icons */}
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => handleToggleFavorite(course)}
                                        className="p-2 bg-white/80 rounded-full shadow hover:bg-white"
                                    >
                                        {isFavorite ? (
                                            <SolidHeart className="h-6 w-6 text-red-500" />
                                        ) : (
                                            <OutlineHeart className="h-6 w-6 text-gray-600" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleToggleWishlist(course)}
                                        className="p-2 bg-white/80 rounded-full shadow hover:bg-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={isInWishlist ? "#facc15" : "none"}
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="#facc15"
                                            className="w-5 h-5 "
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.593 3.322c1.1.128 1.907 1.077 
                        1.907 2.185V21L12 17.25 4.5 21V5.507
                        c0-1.108.806-2.057 1.907-2.185a48.507 
                        48.507 0 0 1 11.186 0Z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/* Content */}
                            <div className="p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className={`text-xl font-bold ${theme === 'Dark' ? 'dark:text-white' : 'text-gray-900'}`}>
                                            {course.course_name}
                                        </h3>
                                        <p className="text-indigo-600 font-semibold text-lg">
                                            ${course.course_price}
                                        </p>
                                    </div>
                                    <p className={`text-sm ${theme === 'Dark' ? 'dark:text-gray-300' : 'text-gray-500'}`}>{course.course_plan}</p>
                                </div>
                                {/* Buttons */}
                                <div className="mb-4 mt-5 flex gap-3">
                                    <button
                                        onClick={() => navigate(`/courses/${course.id}`)}
                                        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-400 transition"
                                    >
                                        View Details
                                    </button>

                                    <button
                                        onClick={() => {
                                            if (!currentUser) return navigate("/login");
                                            if (!enrolled) {
                                                dispatch(enrollCourse(coursePayload));
                                                setLocalEnrollment(prev => ({ ...prev, [course.id]: true }));
                                            } else {
                                                setLocalEnrollment(prev => ({ ...prev, [course.id]: false }));
                                            }
                                        }}
                                        disabled={enrolled}
                                        className={`px-4 py-2 rounded-md text-white transition ${
                                            enrolled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-500"
                                        }`}
                                    >
                                        {enrolled ? "Enrolled" : "Enroll Course"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FeaturedCourses;
