import HSReqFilter from "shared/types/hs-req-filter";

interface StudentGrades {
  nweaMath?: number
  nweaRead?: number
  nweaBoth?: number
  nweaCombined?: number
  gpa?: number
  attendance?: number
}
export const ifHasGrades = (studentGrades: StudentGrades): HSReqFilter => {
  // check to make sure we didn't get a combination of
  // 'bothNWEA', 'nweaMath' or 'nweaRead', 'combinedNWEA'
  return (student, program) => {
    // Compare grades in studentGrades
    // compare gpa
    return false;
  }
};
