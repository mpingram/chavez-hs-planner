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
import { createProgramOutcomeDictionary } from "./create-program-outcome-dictionary";
import { studentDataReducer } from "./student-data-reducer";

export const rootReducer: Redux.Reducer<AppState> = (state = initialState, action) => {

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

  // create new student data in response to action. If action does not change studentData,
  // the unmodified state.studentData object is returned.
  const nextStudentData = studentDataReducer(state.studentData, action);

  // if student data has changed, update program outcomes based on nextStudentData
  let nextOutcomes: ProgramOutcomeDictionary = state.programOutcomes;

  // NOTE simple equality checking here is done intentionally, under the assumption that
  // createNextStudentData returns a reference to the unmodified state.studentData if it is
  // called with an action that does not change state.studentData.
  if (nextStudentData !== state.studentData) {
    nextOutcomes = createProgramOutcomeDictionary(state.hsData.hsPrograms, nextStudentData)
  }

  const nextState: AppState = {
    ...state, 
    studentData: nextStudentData, 
    programOutcomes: nextOutcomes
  };
  return nextState;
}

