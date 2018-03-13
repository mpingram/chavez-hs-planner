import SuccessChance from "shared/enums/success-chance";
import HSRequirementFunction from "shared/types/hs-requirement-function";

export const notImplemented: HSRequirementFunction = (student, program) => {
  return {outcome: SuccessChance.NOTIMPLEMENTED};
};
