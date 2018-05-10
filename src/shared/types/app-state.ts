import {
  StudentData, 
  ProgramOutcome,
  ProgramDictionary, 
  ProgramGroup,
  SchoolDictionary
} from "shared/types";

export interface AppState {
  
  studentData: StudentData;

  programOutcomes: {[programID: string]: ProgramOutcome}

  hsData: {
    hsPrograms: ProgramDictionary,
    esPrograms: ProgramDictionary,
    hsSchools: SchoolDictionary
    hsGroups: ProgramGroup[]
  }

  // HS list
  selectedHSProgramID: string | null
};
