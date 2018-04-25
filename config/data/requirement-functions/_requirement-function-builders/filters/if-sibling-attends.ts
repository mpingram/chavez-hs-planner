import HSReqFilter from "shared/types/hs-req-filter";
import isUninitialized from "shared/util/is-uninitialized";

export const ifSiblingAttends: HSReqFilter = (student, program) => {
  const siblingSchools = student.siblingHSSchoolIDs;
  if (isUninitialized(siblingSchools)) {
    return false;
  }
  const thisSchool = program.schoolID;
  return siblingSchools.some( school => school === thisSchool );
};
