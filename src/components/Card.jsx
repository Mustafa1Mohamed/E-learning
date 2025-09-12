import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Card({
    id,
    course_name,
    course_plan,
    course_image,
    course_price,
    course_description,
    path,
}) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
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
                        <button onClick={toggleFavorite}>
                            <HeartIcon
                                className={`h-6 w-6 transition-colors duration-200 ${
                                    isFavorite ? "text-red-500" : "text-gray-400"
                                }`}
                            />
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

                    <button className="text-md text-center font-medium text-white bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md">
                        Add to Cart
                    </button>

                    <button className="text-md text-center font-medium text-white bg-yellow-500 hover:bg-yellow-400 px-3 py-2 rounded-md">
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
}