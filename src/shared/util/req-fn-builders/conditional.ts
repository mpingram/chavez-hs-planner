import HSReqFilter from "shared/types/hs-req-filter";
import ProgramRequirementFunction from "shared/types/program-requirement-function";
import SuccessChance from "shared/enums/success-chance";

interface Condition {
  filter: HSReqFilter
  fn: ProgramRequirementFunction
}
export const conditional = (...conditions: Condition[]): ProgramRequirementFunction => {
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
