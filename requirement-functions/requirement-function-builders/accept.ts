import {SuccessChance} from "shared/enums/success-chance";
import {RequirementFunction} from "shared/types/requirement-function";

import {ReqFnFilter} from "./filters";

export const accept = (filter: ReqFnFilter): RequirementFunction => {
  return (student, program) => {
    if (filter(student, program)) {
      return SuccessChance.CERTAIN
    } else {
      return SuccessChance.NONE
    }
  }
}

