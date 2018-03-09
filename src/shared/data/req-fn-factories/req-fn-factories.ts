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
  stageSize: LotteryStageSize
}

export const SIBLING_LOTTERY_STAGE = {
  filter: siblingAttends,
  stageSize: LotteryStageSize.SMALL
};

export const GENERAL_LOTTERY_STAGE = {
  filter: all,
  stageSize: LotteryStageSize.LARGE
};

export const lottery = (...stages: LotteryStage[]) => {
  stages.forEach( (stage, i) => {


  });
};

export const conditional = (...conditions: {condition: HSReqFilter, fn: HSRequirementFunction}[]): HSRequirementFunction => {
  // iterate through conditions
  // find first condition that student matches
  // return reqFn for that condition
  return (student, program) => {
    return {outcome: SuccessChance.NOTIMPLEMENTED};
  };
};
