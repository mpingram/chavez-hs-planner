import HSReqFilter from "shared/types/hs-req-filter";
import HSRequirementFunction from "shared/types/hs-requirement-function";
import SuccessChance from "shared/enums/success-chance";

interface Condition {
  filter: HSReqFilter
  fn: HSRequirementFunction
}
export const conditional = (...conditions: Condition[]): HSRequirementFunction => {
  return (student, program) => {
    for (let i=0; i<conditions.length; i++) {
      const c = conditions[i];
      if (c.filter(student, program)) {
        return c.fn(student, program);
      }
    }

    // if student does not match any conditional, return NONE
    return {outcome: SuccessChance.NONE};
  };
};
