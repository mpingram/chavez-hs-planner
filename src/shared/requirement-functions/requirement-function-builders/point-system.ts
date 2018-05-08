import {
  RequirementFunction,
  StudentData,
  Program,
} from "shared/types";

import { SuccessChance } from "shared/enums";
import { POINT_SYSTEM_UNCERTAINTY_THRESHOLD } from "../constants";

type PointCalculator = (student: StudentData, program: Program) => number;
type PointCutoffLookup = (student: StudentData, program: Program) => number;

type PointSystemFn = (calc: PointCalculator, lookup: PointCutoffLookup) => RequirementFunction;


export const pointSystem: PointSystemFn = (calc, lookup) => {
  return (student, program) => {

    const points = calc(student, program);
    const cutoff = lookup(student, program);
    const pointsFromCutoff = points - cutoff;

    // handle failure by returning NOTIMPLEMENTED
    // rather than give inaccurate prediction
    if (isNaN(points) || isNaN(cutoff)) {
      return SuccessChance.NOTIMPLEMENTED;
    }

    if (pointsFromCutoff < 0) {
      return SuccessChance.NONE;
    } else if (pointsFromCutoff <= POINT_SYSTEM_UNCERTAINTY_THRESHOLD) {
      return SuccessChance.LIKELY;
    } else {
      return SuccessChance.CERTAIN;
    }
  }
};

