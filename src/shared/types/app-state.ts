import {
  AppData,
  ProgramOutcomeDictionary,
  StudentData, 
} from "shared/types";

export interface AppState {
  
  studentData: StudentData;

  programOutcomes: ProgramOutcomeDictionary

  loadingStatus: {
    loadingData: boolean
    dataLoaded: boolean
  }

  data: AppData
};
