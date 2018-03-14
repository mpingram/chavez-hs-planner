import HSRequirementFunction from "shared/types/hs-requirement-function";
import SuccessChance from "shared/enums/success-chance";
import {POINT_SYSTEM_UNCERTAINTY_THRESHOLD} from "shared/constants";

type PointCalculator = (StudentData, CPSProgram) => number;
type PointCutoffLookup = (StudentData, CPSProgram) => number;

type PointSystemFn = (calc: PointCalculator, lookup: PointCutoffLookup) => HSRequirementFunction;


const pointSystem: PointSystemFn = (calc, lookup) => {
  return (student, program) => {

    const points = calc(student, program);
    const cutoff = lookup(student, program);
    const pointsFromCutoff = points - cutoff;

    // handle failure by returning NOTIMPLEMENTED
    // rather than give inaccurate prediction
    if (isNaN(points) || isNaN(cutoff)) {
      return {outcome: SuccessChance.NOTIMPLEMENTED};
    }

    if (pointsFromCutoff < 0) {
      return {outcome: SuccessChance.NONE};
    } else if (pointsFromCutoff <= POINT_SYSTEM_UNCERTAINTY_THRESHOLD) {
      return {outcome: SuccessChance.LIKELY};
    } else {
      return {outcome: SuccessChance.CERTAIN};
    }
  }
};

export default pointSystem;
