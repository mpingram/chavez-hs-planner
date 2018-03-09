import HSRequirementFunction from "shared/types/hs-requirement-function";
import SuccessChance from "shared/enums/success-chance";
import HSReqFilter from "./hs-req-filter";

const PROXIMITY_RADIUS_MI = 0.5; // distance that student must live from school to be in proximity lottery

export const accept = (filter: HSReqFilter): HSRequirementFunction => {
  return (student, program) => {
    if (filter(student, program)) {
      return {outcome: SuccessChance.CERTAIN};
    } else {
      return {outcome: SuccessChance.NONE};
    }
  }
}
export const everyone: HSReqFilter = (student, program) => true;

export const combine = (...filters: HSReqFilter[]): HSReqFilter => {
  return (student, program) => {
    return filters.every( filter => filter(student, program) );
  }
};

export const ifSiblingAttends: HSReqFilter = (student, program) => {
  // TODO replace hsprogramIds with hsschoolIds
  const siblingSchools = student.siblingHSProgramIDs;
  const thisSchool = program.School_ID;
  return siblingSchools.some( school => school === thisSchool );
};
export const ifStudentAttends = (...programIDs): HSReqFilter => {
  return (student, program) => {
    return programIDs.some( programID => programID === student.currESProgramID );
  }
};
export const ifInAttendBound: HSReqFilter = (student, program) => {
  // TODO implement / copy
  return true;
};

interface StudentGrades {
  nweaMath?: number
  nweaRead?: number
  nweaBoth?: number
  nweaCombined?: number
  gpa?: number
  attendance?: number
}
export const ifHasGrades = (studentGrades: StudentGrades): HSReqFilter => {
  // check to make sure we didn't get a combination of
  // 'bothNWEA', 'nweaMath' or 'nweaRead', 'combinedNWEA'
  return (student, program) => {
    // Compare grades in studentGrades
    // compare gpa
    return false;
  }
};

// TODO implement
const getDistanceBetween = (student, program): number => 0;

export const ifInProximityOfSchool: HSReqFilter = (student, program) => {
  return getDistanceBetween(student, program) <= PROXIMITY_RADIUS_MI;
};

export enum LotteryStageSize {
  SMALL,
  LARGE
}

interface LotteryStage {
  filter: HSReqFilter
  size: LotteryStageSize
}

export const PROXIMITY_LOTTERY_STAGE = {
  // TODO confirm that this is how this works
  filter: ifInProximityOfSchool,
  size: LotteryStageSize.LARGE
};

export const SIBLING_LOTTERY_STAGE = {
  filter: ifSiblingAttends,
  size: LotteryStageSize.SMALL
};

export const GENERAL_LOTTERY_STAGE = {
  filter: everyone,
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
