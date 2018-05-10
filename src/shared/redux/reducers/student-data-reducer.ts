import * as Redux from "redux";

import { StudentData } from "shared/types";

import { ActionType } from "shared/enums";

import calculateGPA from "shared/util/calculate-gpa";

export const studentDataReducer: Redux.Reducer<StudentData> = (studentData: StudentData, action: Redux.AnyAction): StudentData => {
  let nextStudentData: StudentData = studentData;
  switch(action.type) {
    case ActionType.UpdateStudentGender:
      nextStudentData = {...studentData, gender: action.payload};
      break;
    case ActionType.UpdateStudentLocation:
      nextStudentData = {...studentData, location: action.payload};
      break;
    case ActionType.UpdateStudentGradeLevel:
      nextStudentData = {...studentData, gradeLevel: action.payload};
      break;
    case ActionType.UpdateStudentSkip7OrRepeated8:
      nextStudentData = {...studentData, skippedGrade7OrRepeatedGrade8: action.payload};
      break;
    case ActionType.UpdateStudentCurrESProgram:
      nextStudentData = {...studentData, currESProgramID: action.payload};
      break;
    case ActionType.UpdateStudentELLStatus:
      nextStudentData = {...studentData, ell: action.payload};
      break;
    case ActionType.UpdateStudentIEPStatus:
      nextStudentData = {...studentData, iep: action.payload};
      break;
    case ActionType.UpdateStudentAttendPercentage:
      nextStudentData = {...studentData, attendancePercentage: action.payload};
      break;
    case ActionType.UpdateStudentSiblingHSSchools:
      nextStudentData = {...studentData, siblingHSSchoolIDs: action.payload};
      break;
    case ActionType.UpdateStudentSETestPercentile:
      nextStudentData = {...studentData, seTestPercentile: action.payload};
      break;
    case ActionType.UpdateStudentNWEAPercentileMath:
      nextStudentData = {...studentData, nweaPercentileMath: action.payload};
      break;
    case ActionType.UpdateStudentNWEAPercentileRead:
      nextStudentData = {...studentData, nweaPercentileRead: action.payload};
      break;
    case ActionType.UpdateStudentSubjGradeMath:
      nextStudentData = {
        ...studentData, 
        subjGradeMath: action.payload,
        gpa: calculateGPA(
          action.payload,
          studentData.subjGradeRead,
          studentData.subjGradeSci,
          studentData.subjGradeSocStudies
        )
      };
      break;
    case ActionType.UpdateStudentSubjGradeRead:
      nextStudentData = {
        ...studentData, 
        subjGradeRead: action.payload,
        gpa: calculateGPA(
          studentData.subjGradeMath,
          action.payload,
          studentData.subjGradeSci,
          studentData.subjGradeSocStudies
        )
      };
      break;
    case ActionType.UpdateStudentSubjGradeSci:
      nextStudentData = {
        ...studentData, 
        subjGradeSci: action.payload,
        gpa: calculateGPA(
          studentData.subjGradeMath,
          studentData.subjGradeRead,
          action.payload,
          studentData.subjGradeSocStudies
        )
      };
      break;
    case ActionType.UpdateStudentSubjGradeSocStudies:
      nextStudentData = {
        ...studentData, 
        subjGradeSocStudies: action.payload,
        gpa: calculateGPA(
          studentData.subjGradeMath,
          studentData.subjGradeRead,
          studentData.subjGradeSci,
          action.payload,
        )
      };
      break;
  }
  return nextStudentData;
};
