import HSRequirementFunction from "shared/types/hs-requirement-function";
import SuccessChance from "shared/enums/success-chance";


type PointCalculator = (student, program) => number;
type CutoffLookup = (student, program) => number;
type PointSystemReqFnFactory = (PointCalculator, CutoffLookup) => HSRequirementFunction;

const ibPointCalc = (student, program) => 0;
const ibCutoffLookup = (student, program) => 0;

const IB_POINTS_UNCERTAINTY_THRESHOLD = 2;

export const ibPointSystem = (ibPointCalc, ibCutoffLookup): HSRequirementFunction => {
  return (student, program) => {

    const points = ibPointCalc(student, program);
    const cutoff = ibCutoffLookup(student, program);
    const pointsFromCutoff = points - cutoff;

    // handle failure by returning NOTIMPLEMENTED
    // rather than give inaccurate prediction
    if (isNaN(points) || isNaN(cutoff)) {
      return {outcome: SuccessChance.NOTIMPLEMENTED};
    }

    if (pointsFromCutoff < 0) {
      return {outcome: SuccessChance.NONE};
    } else if (pointsFromCutoff <= IB_POINTS_UNCERTAINTY_THRESHOLD) {
      return {outcome: SuccessChance.LIKELY};
    } else {
      return {outcome: SuccessChance.CERTAIN};
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
      console.error("received NaN for sePointCalc");
      return {outcome: SuccessChance.NOTIMPLEMENTED};
    }
    if (isNaN(prevScores.min) || isNaN(prevScores.avg) || isNaN(prevScores.max)) {
      console.error("received NaN for seCutoffLookup");
      return {outcome: SuccessChance.NOTIMPLEMENTED};
    }

    if (points >= prevScores.max) {
      return {outcome: SuccessChance.CERTAIN};
    } else if (points >= prevScores.avg) {
      return {outcome: SuccessChance.LIKELY};
    } else if (points >= prevScores.min) {
      return {outcome: SuccessChance.UNCERTAIN}; 
    } else {
      return {outcome: SuccessChance.NONE};
    }
  }
};
