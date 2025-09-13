import { Link } from "react-router-dom";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFav } from "../Store/actions/FavAction";
import { toggleWhishlist } from "../Store/actions/WhishListAction";
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.FavReducers.favorites);
    const isFavorite = favorites.some((course) => course.id === id);
    const whishlist = useSelector((state) => state.WhishlistReducer.whishlist);
    const isInWishlist = whishlist.some((course) => course.id === id);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const handleToggleFavorite = () => {
        if (!currentUser) {
            navigate("/login");
            return;
        }
        dispatch(
            toggleFav({
                id,
                course_name,
                course_plan,
                course_image,
                course_price,
                course_description,
            })
        );
    };

    const handleToggleWishlist = () => {
        if (!currentUser) {
            navigate("/login");
            return;
        }
        dispatch(
            toggleWhishlist({
                id,
                course_name,
                course_plan,
                course_image,
                course_price,
                course_description,
            })
        );
    };
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
            {/* Image */}
            <img
                src={course_image}
                alt={course_name}
                className="h-48 w-full object-cover"
            />

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 justify-between">
                {/* Title + Price + Heart */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900 me-2">
                            <Link to={path}>{course_name}</Link>
                        </h3>
                        {/* Heart Toggle */}
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
                        {course_description}
                    </p>
                )}

                {course_plan && (
                    <p className="text-sm text-gray-700 font-medium my-1">
                        {course_plan}
                    </p>
                )}

                {/* Buttons Section */}
                <div className="flex flex-col gap-3 mt-5">
                    {path && (
                        <Link
                            to={path}
                            className="text-md text-center font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-md"
                        >
                            View
                        </Link>
                    )}

                    {currentUser ? (!isFavoritesPage && (
                        <button className="text-md text-center font-medium text-white bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md">
                            Add to Cart
                        </button>
                    )) : (
                        <Link to="/login" className="text-md text-center font-medium text-white bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md">
                            Add to Cart
                        </Link>
                    )}
                    {currentUser ? (!isFavoritesPage && (
                        <button
                            className={`flex justify-center items-center gap-x-2 text-md text-center font-medium text-white bg-yellow-500 hover:bg-yellow-400 px-3 py-2 rounded-md`}
                            onClick={handleToggleWishlist}
                        >
                            <span>Add to Wishlist</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isInWishlist ? "white" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                        </button>
                    )) : (

                        <Link to="/login" className="text-md text-center font-medium text-white bg-yellow-500 hover:bg-yellow-400 px-3 py-2 rounded-md">
                            Add to Wishlist
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
