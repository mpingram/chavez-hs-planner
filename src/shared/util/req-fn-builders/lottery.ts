import {
  ifInProximityOfSchool,
  ifSiblingAttends,
  everyone,
} from "./filters";

import HSReqFilter from "shared/types/hs-req-filter";
import HSRequirementFunction from "shared/types/hs-requirement-function";
import SuccessChance from "shared/enums/success-chance";

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
