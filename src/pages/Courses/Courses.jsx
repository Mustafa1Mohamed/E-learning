import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import Title from "../../components/Title";

function Courses() {
  const [courses, setCourses] = useState([]);

    const API_URL = "https://retoolapi.dev/dL2nNn/data";

    useEffect(() => {
        axios
            .get(API_URL)
            .then((res) => {
                console.log("API DATA:", res.data); // Debug: check the response
                setCourses(res.data);
            })
            .catch((err) => console.log("API Error:", err));
    }, []);

    return (
        <div className="bg-gray-50 py-6 px-16">
            <div className="container mx-auto px-4 pt-24">
                <Title />
                {/* Courses */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses && courses.length > 0 ? (
                        courses.map((course) => (
                            <Card
                                key={course.id}
                                id={course.id}
                                course_name={course.course_name}
                                course_plan={course.course_plan}
                                course_image={course.course_image}
                                course_price={course.course_price}
                                path={`/courses/${course.id}`}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">No courses found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Courses
