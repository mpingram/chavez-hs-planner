import StudentData from "shared/types/student-data";
import ProgramDictionary from "shared/types/program-dictionary";
import ProgramGroup from "shared/types/program-group";

import ImmutableMap from "shared/types/immutable-map";

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
export default AppState;
