import SuccessChance from "shared/enums/success-chance";
import ProgramRequirementFunction from "shared/types/program-requirement-function";

export const notImplemented: ProgramRequirementFunction = (student, program) => {
  return SuccessChance.NOTIMPLEMENTED;
};
