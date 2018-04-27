import { ReqFnFilter} from "./filters";
import {RequirementFunction} from "shared/types/requirement-function";
import {SuccessChance} from "shared/enums/success-chance";

interface Condition {
  filter: ReqFnFilter
  fn: RequirementFunction
}
export const conditional = (...conditions: Condition[]): RequirementFunction => {
  return (student, program) => {
    for (let i=0; i<conditions.length; i++) {
      const c = conditions[i];
      if (c.filter(student, program)) {
        return c.fn(student, program);
      }
    }

    // if student does not match any conditional, return NONE
    return SuccessChance.NONE;
  };
};
