import SuccessChance from "shared/enums/success-chance";
import ProgramID from "shared/types/program-id";

interface ProgramOutcome {
  programID: ProgramID,
  applicationChance: SuccessChance
  selectionChance: SuccessChance
  overallChance: SuccessChance
  distance: number
}

export default ProgramOutcome;
