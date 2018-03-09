import HSRequirementFunction from "shared/types/hs-requirement-function";
import SuccessChance from "shared/enums/success-chance";


type PointCalculator = (student, program) => number;
// TODO CutoffLookup is too simple to handle SE 'cutoffs'.
type CutoffLookup = (student, program) => number;
type PointSystemReqFnFactory = (PointCalculator, CutoffLookup) => HSRequirementFunction;

const ibPointCalc = (student, program) => 0;
const ibCutoffLookup = (student, program) => 0;

const IB_POINTS_UNCERTAINTY_THRESHOLD = 2;

export const ibPointSystem = (ibPointCalc, ibCutoffLookup) => {
  return (student, program) => {

    const points = ibPointCalc(student, program);
    const cutoff = ibCutoffLookup(student, program);
    const pointsFromCutoff = points - cutoff;

    // handle failure by returning NOTIMPLEMENTED
    // rather than give inaccurate prediction
    if (isNaN(points) || isNaN(cutoff)) {
      return SuccessChance.NOTIMPLEMENTED;
    }

    if (pointsFromCutoff < 0) {
      return SuccessChance.NONE;
    } else if (pointsFromCutoff <= IB_POINTS_UNCERTAINTY_THRESHOLD) {
      return SuccessChance.LIKELY;
    } else {
      return SuccessChance.CERTAIN;
    }
  }
};

type PrevYearAcceptanceLookup = (student, program) => {min: number, avg: number, max: number}
const sePointCalc = (student, program) => 0;
const sePrevScoresLookup = (student, program) => {
  return {min: 0, avg: 0, max: 0}
};

export const sePointSystem = (sePointCalc, seCutoffLookup) => {
  return (student, program) => {
    const points = sePointCalc(student, program);
    const prevScores = sePrevScoresLookup(student, program);

    if (isNaN(points)) {
      console.log("received NaN for sePointCalc");
      return SuccessChance.NOTIMPLEMENTED;
    }

    if (points < prevScores
  }
};
