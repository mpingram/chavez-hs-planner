import {
  StudentData, 
  ProgramOutcome,
  ProgramDictionary, 
  ProgramGroup 
} from "shared/types";

export interface AppState {
  
  studentData: StudentData;

  programOutcomes: {[programID: string]: ProgramOutcome}

  hsData: {
    hsPrograms: ProgramDictionary,
    esPrograms: ProgramDictionary,
    hsSchoolNames: {[schoolID: string]: string}
    hsGroups: ProgramGroup[]
  }

  // HS list
  selectedHSProgramID: string | null
};
