import HSRequirementFunction from "shared/types/hs-requirement-function";
import StudentData from "shared/types/student-data";
import CPSProgram from "shared/types/cps-program";
import pointSystem from "./point-system";
import {toLetterGrade} from "shared/util/grade-convert";

import {ifInAttendBound} from "./filters";

declare const require: any;
const ibCutoffTable = require("../../data/ib-cutoffs.json");

const ibPointCalc = (student: StudentData, program: CPSProgram): number => {
  const IB_NWEA_SCORE_CONSTANT = 2.2727;
  const IB_ATTEND_BOUND_BONUS_PTS = 50;

  // calculate points for NWEA scores
  const nweaMathPoints = Math.round(student.nweaPercentileMath * IB_NWEA_SCORE_CONSTANT);
  const nweaReadPoints = Math.round(student.nweaPercentileRead * IB_NWEA_SCORE_CONSTANT);

  // calculate score component for subj grades
  const gradePointsLookup = {
    "A": 112.5,
    "B": 75,
    "C": 38,
    "D": 0,
    "F": 0,
  }
  const subjGradeMathPoints = gradePointsLookup[toLetterGrade(student.subjGradeMath)];
  const subjGradeReadPoints = gradePointsLookup[toLetterGrade(student.subjGradeRead)];
  const subjGradeSciPoints = gradePointsLookup[toLetterGrade(student.subjGradeSci)];
  const subjGradeSocStudiesPoints = gradePointsLookup[toLetterGrade(student.subjGradeSocStudies)];
  
  // if student is in attendance bound of the IB program's school, the student gets a bonus
  // TODO figure out what to do for schools without attendance bounds, like BACK OF THE YARDS HS
  const attendBonus = ifInAttendBound(student, program) ? IB_ATTEND_BOUND_BONUS_PTS : 0;

  const ibPoints = nweaMathPoints +
    nweaReadPoints +
    subjGradeMathPoints +
    subjGradeReadPoints + 
    subjGradeSciPoints +
    subjGradeSocStudiesPoints +
    attendBonus;

  return ibPoints;
};  
const ibCutoffLookup = (student, school): number => {
  const cutoff = ibCutoffTable[school.School_ID];
  if (cutoff === undefined) {
    throw new Error(`School ${school.Long_Name} not found in IB Cutoff scores`); 
  }
  return cutoff;
};

export const ibPointSystem: HSRequirementFunction = pointSystem(ibPointCalc, ibCutoffLookup);

