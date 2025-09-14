import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleFav } from "../../Store/actions/FavAction";
import { useTranslation } from "react-i18next";

function CourseDetails() {
  const { t, i18n } = useTranslation()
  const direction = i18n.dir()
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.FavReducers.favorites);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isFavorite = favorites.some((c) => c.id === parseInt(id));

  const handleToggleFavorite = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    dispatch(toggleFav(course));
  };

  useEffect(() => {
    axios
      .get(`https://retoolapi.dev/dL2nNn/data/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.log("API Error:", err));
  }, [id]);

  if (!course) {
    return (
      <div className="container mx-auto text-center mt-20 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div  dir={direction} className="container mx-auto mt-20 px-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* img */}
        <div className="md:w-1/3">
          <img
            src={course.course_image}
            alt={t(course.course_name)}
            className="w-full h-full object-cover"
          />
        </div>

        {/* content*/}
        <div className="md:w-2/3 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {t(course.course_name)}
              </h1>
              {/* Heart Toggle */}
              <button onClick={handleToggleFavorite}>
                {isFavorite ? (
                  <SolidHeart className="h-7 w-7 text-red-500" />
                ) : (
                  <OutlineHeart className="h-7 w-7 text-gray-400" />
                )}
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-2">{t(course.course_plan)}</p>
            <p className="text-gray-700 mb-4">{t(course.course_description)}</p>
            <p className="text-lg font-semibold text-indigo-600">
              ${course.course_price}
            </p>
          </div>

          {/* btns*/}
          <div className="mt-6 flex gap-3">
            {currentUser ? (
              <>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500">
                  {t("Add to Cart")}
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400">
                  {t("Add to Wishlist")}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                >
                  {t("Add to Cart")}
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400"
                >
                  {t("Add to Wishlist")}
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

