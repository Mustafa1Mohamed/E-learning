import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleFav } from "../../Store/actions/FavAction";
import { toggleWhishlist } from "../../Store/actions/WhishListAction.jsx";
function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.FavReducers.favorites);
  const whishlist = useSelector((state) => state.WhishlistReducer.whishlist);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isFavorite = favorites.some((c) => c.id === parseInt(id));
  const isInWishlist = whishlist.some((c) => c.id === parseInt(id));

  const handleToggleFavorite = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    dispatch(toggleFav(course));
  };
  const handleToggleWishlist = () => {
    if (!currentUser) return navigate("/login");
    dispatch(toggleWhishlist(course));
  };
  
  useEffect(() => {
    axios
      .get(`https://retoolapi.dev/dL2nNn/data/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("API Error:", err));
  }, [id]);

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center">
        <div className="w-full max-w-3xl h-72 bg-gray-200 animate-pulse rounded-2xl"></div>
        <p className="text-center mt-6 text-gray-500 text-lg">Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="relative">
          <img
            src={course.course_image}
            alt={course.course_name}
            className="w-full h-80 object-cover rounded-l-2xl"
          />
          <button
            onClick={handleToggleFavorite}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <SolidHeart className="w-6 h-6 text-red-500" />
            ) : (
              <OutlineHeart className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-snug">
              {course.course_name}
            </h1>
            <p className="mt-2 text-sm font-medium text-indigo-600 uppercase tracking-wide">
              {course.course_plan}
            </p>
            <p className="mt-3 text-gray-700 text-base leading-relaxed line-clamp-4">
              {course.course_description}
            </p>
            <p className="mt-5 text-2xl font-bold text-indigo-600">
              ${course.course_price}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {currentUser ? (
              <>
                <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-500 transition font-medium">
                  Add to Cart
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className="px-5 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition font-medium flex items-center gap-x-2"
                >
                  <span>Add to Wishlist</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      className={`${isInWishlist ? "fill-white" : "fill-none"} stroke-white`}
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-500 transition font-medium"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition font-medium"
                >
                  Add to Wishlist
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default CourseDetails;
