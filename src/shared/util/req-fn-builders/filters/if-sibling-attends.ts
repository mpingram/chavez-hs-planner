import HSReqFilter from "shared/types/hs-req-filter";
import isUninitialized from "shared/util/is-uninitialized";

export const ifSiblingAttends: HSReqFilter = (student, program) => {
  // TODO replace hsprogramIds with hsschoolIds
  const siblingSchools = student.siblingHSProgramIDs;
  if (isUninitialized(siblingSchools)) {
    return false;
  }
  const thisSchool = program.School_ID;
  return siblingSchools.some( school => school === thisSchool );
};
