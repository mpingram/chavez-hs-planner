import HSReqFilter from "shared/types/hs-req-filter";

export const ifSkipped7OrRepeated8: HSReqFilter = (student, program) => {
  if (student.skippedGrade7OrRepeatedGrade8) {
    return true;
  } else {
    return false;
  }
};
