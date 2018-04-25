import HSReqFilter from "shared/types/hs-req-filter";
import SuccessChance from "shared/enums/success-chance";
import ProgramRequirementFunction from "shared/types/program-requirement-function";

export const accept = (filter: HSReqFilter): ProgramRequirementFunction => {
  return (student, program) => {
    if (filter(student, program)) {
      return SuccessChance.CERTAIN
    } else {
      return SuccessChance.NONE
    }
  }
}

