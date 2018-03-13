import HSRequirementFunction from "shared/types/hs-requirement-function";
import StudentData from "shared/types/student-data";
import CPSProgram from "shared/types/cps-program";
import SuccessChance from "shared/enums/success-chance";
import {toLetterGrade} from "shared/util/grade-convert";

declare const require: any;
const sePrevScores = require("../../data/se-prevyear-accepted-scores.json");

type PrevYearAcceptanceLookup = (student, program) => {min: number, avg: number, max: number}

const sePointCalc = (student: StudentData, program: CPSProgram): number => {
  // calculate points for NWEA scores
  const NWEA_SCORE_CONSTANT = 1.515;
  const nweaMathPoints = Math.round(student.nweaPercentileMath * NWEA_SCORE_CONSTANT);
  const nweaReadPoints = Math.round(student.nweaPercentileRead * NWEA_SCORE_CONSTANT);

  // calculate points for subjGrades
  const gradePointsLookup = {
    "A": 75,
    "B": 50,
    "C": 25,
    "D": 0,
    "F": 0,
  }
  const subjGradeMathPoints = gradePointsLookup[toLetterGrade(student.subjGradeMath)];
  const subjGradeReadPoints = gradePointsLookup[toLetterGrade(student.subjGradeRead)];
  const subjGradeSciPoints = gradePointsLookup[toLetterGrade(student.subjGradeSci)];
  const subjGradeSocStudiesPoints = gradePointsLookup[toLetterGrade(student.subjGradeSocStudies)];

  // calculate score component for SE Test percentile 
  const SE_TEST_PERCENTILE_CONSTANT = 3.03; 
  const seTestPoints = Math.round(student.seTestPercentile * SE_TEST_PERCENTILE_CONSTANT);
  
  const sePoints = nweaMathPoints +
    nweaReadPoints +
    subjGradeMathPoints +
    subjGradeReadPoints + 
    subjGradeSciPoints +
    subjGradeSocStudiesPoints +
    seTestPoints;

  return sePoints;
};

const seLookup: PrevYearAcceptanceLookup = (student, school)  => {
  // TODO: this ignores rank cutoff scores, assuming that if you make it
  // past your tier cutoff scores you're good. Make double sure that's a
  // good assumption.
  const cutoff = sePrevScores[school.School_ID];
  if (cutoff === undefined) {
    throw new Error(`School ${school.Long_Name} not found in SE Cutoff scores`); 
  }
  switch(student.location.tier) {
    case '1':
      return cutoff.tier1; 
    case '2':
      return cutoff.tier2;
    case '3':
      return cutoff.tier3;
    case '4':
      return cutoff.tier4;
    default:
      throw new Error("No tier");
  }
};

export const sePointSystem = (student, program) => {
  const points = sePointCalc(student, program);
  const prevScores = seLookup(student, program);

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

export default sePointSystem;
