import { StudentData } from "shared/types";

export const initialStudentData: StudentData = {
  gender: null,
  location: {
    address: null,
    tier: null,
    geo: {latitude: null, longitude: null},
  },
  gradeLevel: null,
  prevGradeLevel: null,
  iep: null,
  ell: null,
  attendancePercentage: null,
  gpa: null,
  skippedGrade7OrRepeatedGrade8: null,

  currESProgramID: null,
  siblingHSSchoolIDs: [],
  seTestPercentile: null,
  nweaPercentileMath: null,
  nweaPercentileRead: null,
  subjGradeMath: null,
  subjGradeRead: null,
  subjGradeSci: null,
  subjGradeSocStudies: null,
};
