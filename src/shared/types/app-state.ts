import {StudentData, ProgramDictionary, ProgramGroup, ImmutableMap } from "shared/types";

interface AppStateShape {
  
  studentData: ImmutableMap<StudentData>

  hsData: ImmutableMap<{
    hsPrograms: ProgramDictionary,
    esPrograms: ProgramDictionary,
    hsSchoolNames: {[schoolID: string]: string}
    hsGroups: ProgramGroup[]
  }>

  // HS list
  selectedHSProgramID: string | null
}

type AppState = ImmutableMap<AppStateShape>
export {AppState};
