import HSRequirementFunction from "shared/types/hs-requirement-function";
import SuccessChance from "shared/enums/success-chance";
import HSReqFilter from "./hs-req-filter";

export const all: HSReqFilter = (student, program) => true;
export const none: HSReqFilter = (student, program) => false;
export const siblingAttends: HSReqFilter = (student, program) => {
  // TODO replace hsprogramIds with hsschoolIds
  const siblingSchools = student.siblingHSProgramIDs;
  const thisSchool = program.School_ID;
  return siblingSchools.some( school => school === thisSchool );
};
export const studentAttends = (...programIDs): HSReqFilter => {
  return (student, program) => {
    return programIDs.some( programID => programID === student.currESProgramID );
  }
};

interface StudentGrades {
  nweaMath: number
  nweaRead: number
  nweaBoth: number
  nweaCombined: number
  gpa: number
  attendance: number
}
export const hasGrades = (studentGrades: StudentGrades): HSReqFilter => {
  // check to make sure we didn't get a combination of
  // 'bothNWEA', 'nweaMath' or 'nweaRead', 'combinedNWEA'
  return (student, program) => {
    // Compare grades in studentGrades
    // compare gpa
    return false;
  }
};

enum LotteryStageSize {
  SMALL,
  LARGE
}

interface LotteryStage {
  filter: HSReqFilter
  size: LotteryStageSize
}

export const SIBLING_LOTTERY_STAGE = {
  filter: siblingAttends,
  size: LotteryStageSize.SMALL
};

export const GENERAL_LOTTERY_STAGE = {
  filter: all,
  size: LotteryStageSize.LARGE
};

export const lottery = (...stages: LotteryStage[]): HSRequirementFunction => {
  // stage logic:
  // SMALL stage and no previous LARGE stages => LIKELY.
  // SMALL stage and prev LARGE stage => UNLIKELY
  // LARGE stage and no previous LARGE stages => UNCERTAIN;
  // LARGE stage and prev LARGE stage => UNLIKELY
  
  return (student, program) => {
    let prevLargeStage = false;
    for (let i=0; i<stages.length; i++) {

      // if student matches this stage, determine
      // how likely the student is to be accepted
      // based on how large the previous lottery stages were.
      const stage = stages[i];
      if (stage.filter(student, program)) {
        if (prevLargeStage) {
          return {outcome: SuccessChance.UNLIKELY};
        } else {
          if (stage.size === LotteryStageSize.SMALL) {
            return {outcome: SuccessChance.LIKELY};
          } else if (stage.size === LotteryStageSize.LARGE) {
            return {outcome: SuccessChance.UNCERTAIN};
          }
        }
      }
      // if student does not match this stage, record if
      // this stage was LARGE.
      if (stage.size === LotteryStageSize.LARGE) {
        prevLargeStage = true;
      }
    }

    // if student does not match any stage of lottery, return NONE
    return {outcome: SuccessChance.NONE};
  }
};

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
