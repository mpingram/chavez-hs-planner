import {
  AppData,
  Program,
  ProgramOutcome,
  ProgramOutcomeDictionary,
  StudentData, 
  ProgramModalState
} from "shared/types";

export interface AppState {

  studentData: StudentData

  programOutcomes: ProgramOutcomeDictionary

  loadingStatus: {
    loadingData: boolean
    dataLoaded: boolean
  }

  data: AppData

  programModalState: ProgramModalState  
};
