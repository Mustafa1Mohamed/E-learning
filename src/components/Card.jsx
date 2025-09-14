import { Link, useNavigate } from "react-router-dom";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleFav } from "../Store/actions/FavAction";
import { toggleWhishlist } from "../Store/actions/WhishListAction";
import { useTranslation } from "react-i18next";
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

    const favorites = useSelector((state) => state.FavReducers.favorites);
    const whishlist = useSelector((state) => state.WhishlistReducer.whishlist);

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

    const renderActionButton = (label, onClick, bgColor, icon = null) =>
        currentUser ? (
            !isFavoritesPage && (
                <button
                    onClick={onClick}
                    className={`flex justify-center items-center gap-x-2 text-md text-center font-medium text-white ${bgColor} hover:opacity-90 px-3 py-2 rounded-md`}
                >
                    <span>{label}</span>
                    {icon}
                </button>
            )
        ) : (
            <Link
                to="/login"
                className={`text-md text-center font-medium text-white ${bgColor} hover:opacity-90 px-3 py-2 rounded-md`}
            >
                {label}
            </Link>
        );

    return (
        <div dir={direction} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      
            <img
                src={course_image}
                alt={course_name}
                className="h-48 w-full object-cover"
            />

            <div className="flex flex-col flex-1 p-6 justify-between">
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900 me-2">
                            <Link to={path}>{t(course_name)}</Link>
                        </h3>

                        <button onClick={handleToggleFavorite}>
                            {isFavorite ? (
                                <SolidHeart className="h-6 w-6 text-red-500" />
                            ) : (
                                <OutlineHeart className="h-6 w-6 text-gray-400" />
                            )}
                        </button>
                    </div>

                    {course_price && (
                        <p className="text-lg font-medium text-indigo-600">
                            ${course_price}
                        </p>
                    )}
                </div>


                {course_description && (
                    <p className="text-sm text-gray-500 line-clamp-3 mt-2">
                        {t(course_description)}
                    </p>
                )}


                {course_plan && (
                    <p className="text-sm text-gray-700 font-medium my-1">
                        {t(course_plan)}
                    </p>
                )}
                {course_description && (
                    <p className="text-sm text-gray-500 line-clamp-3 mt-2">
                        {course_description}
                    </p>
                )}

                <div className="flex flex-col gap-3 mt-5">
                    {path && (
                        <Link
                            to={path}
                            className="text-md text-center font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-md"
                        >
                            {t("View Details")}
                        </Link>

                {/* Buttons */}
                <div className="flex flex-col gap-3 mt-5">
                    {/* View Details */}
                    {renderActionButton(
                        "View Details",
                        () => navigate(path),
                        "bg-indigo-600"

                    )}
                    {/* Add to Cart */}
                    {renderActionButton("Add to Cart", () => { }, "bg-green-600")}


                    {currentUser ? (!isFavoritesPage && (
                        <button className="text-md text-center font-medium text-white bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md">
                            {t("Add to Cart")}
                        </button>
                    )) : (
                        <Link to="/login" className="text-md text-center font-medium text-white bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md">
                            {t("Add to Cart")}
                        </Link>
                    )}
                    {currentUser ? (!isFavoritesPage && (
                        <button
                            className={`flex justify-center items-center gap-x-2 text-md text-center font-medium text-white bg-yellow-500 hover:bg-yellow-400 px-3 py-2 rounded-md`}
                            onClick={handleToggleWishlist}
                        >
                            <span>{t("Add to Wishlist")}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isInWishlist ? "white" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                        </button>
                    )) : (

                        <Link to="/login" className="text-md text-center font-medium text-white bg-yellow-500 hover:bg-yellow-400 px-3 py-2 rounded-md">
                            {t("Add to Wishlist")}
                        </Link>

                    {/* Add to Wishlist */}
                    {renderActionButton(
                        "Add to Wishlist",
                        handleToggleWishlist,
                        "bg-yellow-500",
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={isInWishlist ? "white" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                            />
                        </svg>

                    )}
                </div>
            </div>
        </div>
    );
}
