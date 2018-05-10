import {
  StudentData, 
  ProgramOutcome,
  ProgramDictionary, 
  ProgramGroupDictionary,
  SchoolDictionary
} from "shared/types";

export interface AppState {
  
  studentData: StudentData;

  programOutcomes: {[programID: string]: ProgramOutcome}

  hsData: {
    hsPrograms: ProgramDictionary,
    esPrograms: ProgramDictionary,
    hsSchools: SchoolDictionary
    hsProgramGroups: ProgramGroupDictionary
  }

  // HS list
  selectedHSProgramID: string | null
};
