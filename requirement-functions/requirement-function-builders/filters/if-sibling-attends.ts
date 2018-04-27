import { ReqFnFilter} from "./";
import isUninitialized from "shared/util/is-uninitialized";

export const ifSiblingAttends: ReqFnFilter = (student, program) => {
  const siblingSchools = student.siblingHSSchoolIDs;
  if (isUninitialized(siblingSchools)) {
    return false;
  }
  const thisSchool = program.schoolID;
  return siblingSchools.some( school => school === thisSchool );
};
