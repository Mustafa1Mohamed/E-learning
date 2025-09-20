export const ENROLL_COURSE = "ENROLL_COURSE";
export const UNENROLL_COURSE = "UNENROLL_COURSE";

export const enrollCourse = (course) => {
  return {
    type: ENROLL_COURSE,
    payload: course,
  };
};

export const unenrollCourse = (course) => {
  return {
    type: UNENROLL_COURSE,
    payload: course,
  };
};
