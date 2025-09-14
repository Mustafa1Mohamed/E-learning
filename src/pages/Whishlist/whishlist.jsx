import { useSelector } from "react-redux";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";
function Wishlist() {
    const { t, i18n } = useTranslation();
    const direction = i18n.dir();
    const whishlist = useSelector((state) => state.WhishlistReducer.whishlist);
    console.log(whishlist);
    return (
            <div dier={direction} className="bg-gray-50 py-6 px-16 min-h-screen">
                <div className="container mx-auto px-4 pt-24">
                    <h1 className="text-3xl font-bold text-indigo-500 mb-6 text-center">{t("My Whishlist")}</h1>
                    <div dir={direction} className="mt-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whishlist && whishlist.length > 0 ? (
                            whishlist.map((course) => (
                                <Card
                                    key={course.id}
                                    id={course.id}
                                    course_name={course.course_name}
                                    course_plan={course.course_plan}
                                    course_image={course.course_image}
                                    course_price={course.course_price}
                                    course_description={course.course_description}
                                    path={`/courses/${course.id}`}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">{t("No courses found.")}</p>
                        )}
                    </div>
                </div>
            </div>
        )
}

export default Wishlist     