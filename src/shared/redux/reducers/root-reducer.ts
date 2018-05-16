import * as Redux from "redux";

import { 
  AppState,
  ProgramOutcomeDictionary
} from "shared/types";

import { createProgramOutcomeDictionary } from "../utils";

import { initialState } from "./initial-state";

import { studentDataReducer } from "./student-data-reducer";
import { loadingStatusReducer } from "./loading-status-reducer";
import { dataReducer } from "./data-reducer";

//export const rootReducer: Redux.Reducer<AppState> = Redux.combineReducers({
//  studentData: studentDataReducer,
//  programOutcomes: programOutcomesReducer,
//  loadingStatus: loadingStatusReducer,
//  data: dataReducer
//});

export const rootReducer: Redux.Reducer<AppState> = (state = initialState, action): AppState => {

  const nextStudentData = studentDataReducer(state.studentData, action);
  const nextLoadingStatus = loadingStatusReducer(state.loadingStatus, action);
  const nextData = dataReducer(state.data, action);

  /* 
   * If student data or data has changed, update program outcomes.
   * */
  const studentDataChanged = nextStudentData !== state.studentData;
  const dataChanged = nextData !== state.data;
  let nextProgramOutcomes: ProgramOutcomeDictionary;
  if (studentDataChanged || dataChanged) {
    nextProgramOutcomes = createProgramOutcomeDictionary(nextStudentData, nextData.hsPrograms);
  } else {
    nextProgramOutcomes = state.programOutcomes;
  }
  
  return {
    studentData: nextStudentData,
    loadingStatus: nextLoadingStatus,
    data: nextData,
    programOutcomes: nextProgramOutcomes
  };
};

