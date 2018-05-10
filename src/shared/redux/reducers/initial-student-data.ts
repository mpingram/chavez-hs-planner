import { StudentData } from "shared/types";
import { Gender } from "shared/enums";

export const initialStudentData: StudentData = {
  gender: Gender.NOANSWER,
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
