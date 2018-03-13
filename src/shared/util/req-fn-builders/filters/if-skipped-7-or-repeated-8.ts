import HSReqFilter from "shared/types/hs-req-filter";

export const ifSkipped7OrRepeated8: HSReqFilter = (student, program) => {
  if (student.gradeLevel === 8 && student.prevGradeLevel !== 7) {
    return true;
  } else {
    return false;
  }
};
