import { AppState } from "shared/types";

export const initialStudentData = {
  gender: null,
  location: null,
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
  subjGradeSocStudies: null
};
export const initialProgramOutcomes = {};
export const initialLoadingStatus = {
  loadingData: false,
  dataLoaded: false
};
export const initialData = {
  hsPrograms: {},
  nonHSPrograms: {},
  hsSchools: {},
  hsProgramGroups: {},

  seCutoffScores: {},
  nonSECutoffScores: {},
  programTypeIDTable: {},
  schoolAttendanceBoundaryTable: {},
  tractTierTable: {}
};

export const initialState: AppState = {
  studentData: initialStudentData,
  programOutcomes: initialProgramOutcomes,
  loadingStatus: initialLoadingStatus,
  data: initialData
};
