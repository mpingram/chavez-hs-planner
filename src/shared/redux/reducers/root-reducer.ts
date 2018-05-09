import * as Redux from "redux";

import {
  AppState,
  StudentData,
  Program,
  ProgramOutcome,
  ProgramOutcomeDictionary,
  RequirementFunction
} from "shared/types";

import {
  ActionType,
  SuccessChance
} from "shared/enums";

import { getOverallSuccessChance } from "shared/util/get-overall-success-chance";
import calculateGPA from "shared/util/calculate-gpa";

import { initialState } from "./initial-state";

const rootReducer: Redux.Reducer<AppState> = (state = initialState, action) => {

  /*
   * AppState consists of 
   * {
   *   studentData: {...} 
   *   programOutcomes: {[programID: string]: ProgramOutcome}
   *   hsData: {...}
   * }
   *
   * Properties on state.studentData (except for state.studentData.gpa) are updated
   * directly by response to actions.
   *
   * state.programOutcomes is updated in response to changes in state.studentData.
   *
   * Properties on state.hsData are never updated.
   * */

  let nextStudentData: StudentData;
  switch(action.type) {
    case ActionType.UpdateStudentGender:
      nextStudentData = {...state.studentData, gender: action.payload};

    case ActionType.UpdateStudentLocation:
      nextStudentData = {...state.studentData, location: action.payload};

    case ActionType.UpdateStudentGradeLevel:
      nextStudentData = {...state.studentData, gradeLevel: action.payload};

    case ActionType.UpdateStudentSkip7OrRepeated8:
      nextStudentData = {...state.studentData, skippedGrade7OrRepeatedGrade8: action.payload};

    case ActionType.UpdateStudentCurrESProgram:
      nextStudentData = {...state.studentData, currESProgramID: action.payload};

    case ActionType.UpdateStudentELLStatus:
      nextStudentData = {...state.studentData, ell: action.payload};

    case ActionType.UpdateStudentIEPStatus:
      nextStudentData = {...state.studentData, iep: action.payload};

    case ActionType.UpdateStudentAttendPercentage:
      nextStudentData = {...state.studentData, attendancePercentage: action.payload};

    case ActionType.UpdateStudentSiblingHSSchools:
      nextStudentData = {...state.studentData, siblingHSSchoolIDs: action.payload};

    case ActionType.UpdateStudentSETestPercentile:
      nextStudentData = {...state.studentData, seTestPercentile: action.payload};

    case ActionType.UpdateStudentNWEAPercentileMath:
      nextStudentData = {...state.studentData, nweaPercentileMath: action.payload};

    case ActionType.UpdateStudentNWEAPercentileRead:
      nextStudentData = {...state.studentData, nweaPercentileRead: action.payload};

    case ActionType.UpdateStudentSubjGradeMath:
      nextStudentData = {
        ...state.studentData, 
        subjGradeMath: action.payload,
        gpa: calculateGPA(
          action.payload,
          state.studentData.subjGradeRead,
          state.studentData.subjGradeSci,
          state.studentData.subjGradeSocStudies
        )
      };

    case ActionType.UpdateStudentSubjGradeRead:
      nextStudentData = {
        ...state.studentData, 
        subjGradeRead: action.payload,
        gpa: calculateGPA(
          state.studentData.subjGradeMath,
          action.payload,
          state.studentData.subjGradeSci,
          state.studentData.subjGradeSocStudies
        )
      };

    case ActionType.UpdateStudentSubjGradeSci:
      nextStudentData = {
        ...state.studentData, 
        subjGradeSci: action.payload,
        gpa: calculateGPA(
          state.studentData.subjGradeMath,
          state.studentData.subjGradeRead,
          action.payload,
          state.studentData.subjGradeSocStudies
        )
      };
      
    case ActionType.UpdateStudentSubjGradeSocStudies:
      nextStudentData = {
        ...state.studentData, 
        subjGradeSocStudies: action.payload,
        gpa: calculateGPA(
          state.studentData.subjGradeMath,
          state.studentData.subjGradeRead,
          state.studentData.subjGradeSci,
          action.payload,
        )
      };
  }

  // update outcomes based on nextStudentData
  let nextOutcomes: ProgramOutcomeDictionary = {};
  Object.keys(state.hsData.hsPrograms).forEach( programID => {
    const program = state.hsData.hsPrograms[programID];
    const applicationChance = program.applicationReqFn(nextStudentData, program);
    const selectionChance = program.selectionReqFn(nextStudentData, program);
    const outcome: ProgramOutcome = {
      programID: programID,
      applicationChance: applicationChance,
      selectionChance: selectionChance,
      overallChance: getOverallSuccessChance({application: applicationChance, selection: selectionChance})
    }
    nextOutcomes[programID] = outcome;
  });

  const nextState: AppState = {
    ...state, 
    studentData: nextStudentData, 
    programOutcomes: nextOutcomes
  };
  return nextState;
}

