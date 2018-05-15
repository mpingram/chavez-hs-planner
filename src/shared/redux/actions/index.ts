import {
  ActionType,
  Gender,
  ScoreType
}  from "shared/enums";

import { StudentLocation } from "shared/types";

export { loadAllData } from "./data-loading";
export * from "./update-program-outcomes";

export const selectHSProgram = (newValue: string) => {
  return {
    type: ActionType.SelectHSProgram,
    payload: newValue
  };
};

export const updateStudentAttendPercentage = (newValue: number) => {
  return {
    type: ActionType.UpdateStudentAttendPercentage,
    payload: newValue
  }
};

export const updateStudentELLStatus = (newValue: boolean) => {
  return {
    type: ActionType.UpdateStudentELLStatus,
    payload: newValue
  }
};

export const updateStudentGender = (newValue: Gender) => {
  return {
    type: ActionType.UpdateStudentGender,
    payload: newValue
  }
};

export const updateStudentGradeLevel = (newValue: number) => {
  return {
    type: ActionType.UpdateStudentGradeLevel,
    payload: newValue
  }
};

export const updateStudentPrevGradeLevel = (newValue: number) => {
  return {
    type: ActionType.UpdateStudentPrevGradeLevel,
    payload: newValue
  }
};

export const updateStudentIEPStatus = (newValue: boolean) => {
  return {
    type: ActionType.UpdateStudentIEPStatus,
    payload: newValue
  }
};

export const updateStudentLocation = (location: StudentLocation) => {
  return {
    type: ActionType.UpdateStudentLocation,
    payload: location
  }
};

export const updateStudentCurrESProgram = (newValue: string) => {
  return {
    type: ActionType.UpdateStudentCurrESProgram,
    payload: newValue 
  }
};

export const updateStudentSiblingHSSchools = (newValues: string[]) => {
  return {
    type: ActionType.UpdateStudentSiblingHSSchools,
    payload: newValues
  }
};

export const updateStudentSkip7OrRepeated8 = (newValue: boolean) => {
  return {
    type: ActionType.UpdateStudentSkip7OrRepeated8,
    payload: newValue
  }
};

export const updateStudentNWEAPercentileMath = (newValue: number) => {
  return {
    type: ActionType.UpdateStudentNWEAPercentileMath,
    payload: newValue
  };
};

export const updateStudentNWEAPercentileRead = (newValue: number) => {
  return {
    type: ActionType.UpdateStudentNWEAPercentileRead,
    payload: newValue
  };
};

export const updateStudentSubjGradeMath = (newValue: number) => {
  return {
    type: ActionType.UpdateStudentSubjGradeMath,
    payload: newValue
  };
};

export const updateStudentSubjGradeRead = (newValue: number) => {
  return {
    type: ActionType.UpdateStudentSubjGradeRead,
    payload: newValue
  };
};

export const updateStudentSubjGradeSci = (newValue: number) => {
  return {
    type: ActionType.UpdateStudentSubjGradeSci,
    payload: newValue
  };
};

export const updateStudentSubjGradeSocStudies = (newValue: number) => {
  return {
    type: ActionType.UpdateStudentSubjGradeSocStudies,
    payload: newValue
  };
};

export const updateStudentSETestPercentile = (newValue: number) => {
  return {
    type: ActionType.UpdateStudentSETestPercentile,
    payload: newValue
  }
};

export const updateStudentScore = (scoreType: ScoreType, newValue: number) => {
  let actionType;
  switch(scoreType) {
    case ScoreType.nweaPercentileMath:
      actionType = ActionType.UpdateStudentNWEAPercentileMath;
      break;
    case ScoreType.nweaPercentileRead:
      actionType = ActionType.UpdateStudentNWEAPercentileRead;
      break;
    case ScoreType.subjGradeMath:
      actionType = ActionType.UpdateStudentSubjGradeMath;
      break;
    case ScoreType.subjGradeRead:
      actionType = ActionType.UpdateStudentSubjGradeRead;
      break;
    case ScoreType.subjGradeSci:
      actionType = ActionType.UpdateStudentSubjGradeSci;
      break;
    case ScoreType.subjGradeSocStudies:
      actionType = ActionType.UpdateStudentSubjGradeSocStudies;
      break;
    case ScoreType.seTestPercentile:
      actionType = ActionType.UpdateStudentSETestPercentile;
      break;
    default:
      throw new Error(`Unrecognized ScoreType: ${scoreType}`);
  }
  return {
    type: actionType,
    payload: newValue
  };
}


