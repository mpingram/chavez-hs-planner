import {
  ProgramDictionary,
  ProgramOutcome,
  ProgramOutcomeDictionary,
  StudentData
} from "shared/types";

import { SuccessChance } from "shared/enums";

import { getOverallSuccessChance } from "shared/util/get-overall-success-chance";

export const createProgramOutcomeDictionary = (programDict: ProgramDictionary, studentData: StudentData): ProgramOutcomeDictionary => {
  let outcomeDict: ProgramOutcomeDictionary = {};
  Object.keys(programDict).forEach( programID => {
    const program = programDict[programID];
    const applicationChance = program.applicationReqFn(studentData, program);
    const selectionChance = program.selectionReqFn(studentData, program);
    const outcome: ProgramOutcome = {
      programID: programID,
      applicationChance: applicationChance,
      selectionChance: selectionChance,
      overallChance: getOverallSuccessChance({application: applicationChance, selection: selectionChance})
    }
    outcomeDict[programID] = outcome;
  });
  return outcomeDict;
};

export const createInitialProgramOutcomeDictionary = (programDict: ProgramDictionary) => {
  let initialOutcomes = {};
  Object.keys(programDict).forEach( programID => {
    const outcome: ProgramOutcome = {
      programID: programID,
      applicationChance: SuccessChance.NOTIMPLEMENTED,
      selectionChance: SuccessChance.NOTIMPLEMENTED,
      overallChance: SuccessChance.NOTIMPLEMENTED
    }
    initialOutcomes[programID] = outcome;
  });
  return initialOutcomes;
};
