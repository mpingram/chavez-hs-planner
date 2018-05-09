import { SuccessChance } from "shared/enums";
import { ProgramID } from "shared/types";

interface ProgramOutcome {
  programID: ProgramID,
  applicationChance: SuccessChance
  selectionChance: SuccessChance
  overallChance: SuccessChance
  distance?: number
}

export {ProgramOutcome};
