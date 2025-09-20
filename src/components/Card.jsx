import { Link, useNavigate } from "react-router-dom";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleFav } from "../Store/actions/FavAction";
import { toggleWhishlist } from "../Store/actions/WhishListAction";
import { useTranslation } from "react-i18next";
import { enrollCourse } from "../Store/actions/EnrolledCoursesAction";


export default function Card({
    id,
    course_name,
    course_plan,
    course_image,
    course_price,
    course_description,
    path,
    isFavoritesPage = false,
}) {
    const { t, i18n } = useTranslation();
    const direction = i18n.dir();
    const navigate = useNavigate();
    const dispatch = useDispatch();

   const enrolledCourses = useSelector((state) => state.EnrolledCoursesReducer.enrolled);
   const isEnrolled = enrolledCourses.some((course) => course.id === id);


    const favorites = useSelector((state) => state.FavReducers.favorites);
    const whishlist = useSelector((state) => state.WhishlistReducer.whishlist);

    //  Theme from Redux
    const theme = useSelector((state) => state.combineTheme.theme);

    const isFavorite = favorites.some((course) => course.id === id);
    const isInWishlist = whishlist.some((course) => course.id === id);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));


    const coursePayload = {
        id,
        course_name,
        course_plan,
        course_image,
        course_price,
        course_description,
    };

    const handleToggleFavorite = () => {
        if (!currentUser) return navigate("/login");
        dispatch(toggleFav(coursePayload));
    };

    const handleToggleWishlist = () => {
        if (!currentUser) return navigate("/login");
        dispatch(toggleWhishlist(coursePayload));
    };


     const handleEnroll = () => {
    if (!currentUser) return navigate("/login");
    if (!isEnrolled) dispatch(enrollCourse(coursePayload));
    };

    

    const renderActionButton = (label, onClick, bgColor, icon = null, alwaysShow = false) =>
        currentUser ? (
            (alwaysShow || !isFavoritesPage) && (
                <button
                    onClick={onClick}
                    className={`flex justify-center items-center gap-x-2 text-md text-center font-medium text-white ${bgColor} hover:opacity-90 px-3 py-2 rounded-md w-full`}
                >
                    <span>{label}</span>
                    {icon}
                </button>
            )
        ) : (
            <Link
                to="/login"
                className={`text-md text-center font-medium text-white ${bgColor} hover:opacity-90 px-3 py-2 rounded-md w-full`}
            >
                {label}
            </Link>
        );

    return (
      <div
    dir={direction}
    className={`${
        theme === "Dark"
            ? "bg-gray-800 text-white border border-gray-500"
            : "bg-gray-100 text-gray-900 border"
    } shadow-md rounded-lg overflow-hidden flex flex-col`}
>

            {/* Image with blur overlay and icons */}
            <div className="relative">
                <img
                    src={course_image}
                    alt={course_name}
                    className="h-48 w-full object-cover"
                />

                {/* Blur Overlay */}
                <div className="absolute inset-0 bg-black/30 "></div>

                {/* Icons */}
                <div className="absolute top-2 right-2 flex gap-2">
                    {/* Favorite */}
                    <button
                        onClick={handleToggleFavorite}
                        className="p-2 bg-white/80 rounded-full shadow hover:bg-white"
                    >
                        {isFavorite ? (
                            <SolidHeart className="h-5 w-5 text-red-500" />
                        ) : (
                            <OutlineHeart className="h-5 w-5 text-gray-600" />
                        )}
                    </button>

                    {/* Wishlist */}
                    {!isFavoritesPage && (
                        <button
                            onClick={handleToggleWishlist}
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
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 justify-between">

                <div className="flex items-center justify-between mt-2">
                    <h3 className={`text-lg font-bold me-2 ${theme === 'Dark' ? 'text-white' : 'text-gray-900'}`}>
                        <Link to={path}>{t(course_name)}</Link>
                    </h3>

                    {course_price && (
                        <p className="text-lg font-medium text-indigo-600">
                            ${course_price}
                        </p>
                    )}
                </div>

                {course_description && (
                    <p className={`text-sm line-clamp-3 mt-2 ${theme === 'Dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                        {t(course_description)}
                    </p>
                )}

                {course_plan && (
                    <p className={`text-sm font-medium my-1 ${theme === 'Dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                        {t(course_plan)}
                    </p>
                )}

                {/* Actions in one row */}
                <div className="flex gap-3 mt-5">
                    {renderActionButton(
                        t("View Details"),
                        () => navigate(path),
                        "bg-indigo-600",
                        null,
                        true
                    )}

                    

                    {renderActionButton(
                     isEnrolled ? t("Enrolled") : t("Enroll Course"),
                    handleEnroll, isEnrolled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600",
                  )}
                </div>
            </div>
        </div>
    );
}



