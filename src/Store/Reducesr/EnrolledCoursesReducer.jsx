import { ENROLL_COURSE, UNENROLL_COURSE } from "../actions/EnrolledCoursesAction";
const initialState = {
  enrolled: JSON.parse(localStorage.getItem("enrolledCourses")) || [],
};

export const EnrolledCoursesReducer = (state = initialState, action) => {
  let updatedEnrolled;
  switch (action.type) {
    case ENROLL_COURSE:
      if (state.enrolled.some((c) => c.id === action.payload.id)) return state;
      updatedEnrolled = [...state.enrolled, action.payload];
      localStorage.setItem("enrolledCourses", JSON.stringify(updatedEnrolled));
      return { ...state, enrolled: updatedEnrolled };

    case UNENROLL_COURSE:
      updatedEnrolled = state.enrolled.filter((c) => c.id !== action.payload.id);
      localStorage.setItem("enrolledCourses", JSON.stringify(updatedEnrolled));
      return { ...state, enrolled: updatedEnrolled };

    default:
      return state;
  }
};
