import HSReqFilter from "shared/types/hs-req-filter";

export const ifSiblingAttends: HSReqFilter = (student, program) => {
  // TODO replace hsprogramIds with hsschoolIds
  const siblingSchools = student.siblingHSProgramIDs;
  const thisSchool = program.School_ID;
  return siblingSchools.some( school => school === thisSchool );
};
