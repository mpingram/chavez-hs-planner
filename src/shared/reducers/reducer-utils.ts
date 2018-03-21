import CPSProgram from "shared/types/cps-program";
import StudentData from "shared/types/student-data";
import HSRequirementFunction from "shared/types/hs-requirement-function";
import SuccessChance from "shared/enums/success-chance";
import isHSProgram from "shared/util/is-hs-program";
import isESProgram from "shared/util/is-es-program";

declare const require: any;
const hsProgramGroups = require("../../../src/shared/data/hs_groups.json");

type Outcome = {application: SuccessChance, selection: SuccessChance};
type ReqFnLookup = (program: CPSProgram) => {application: HSRequirementFunction, selection: HSRequirementFunction};

export const createIndexByID = (programs: CPSProgram[]): {[id: string]: number} => {
  let idx = {};
  for (let i=0; i<programs.length; i++) {
    const program = programs[i];
    idx[program.ID] = i;
  }
  return idx;
};

const alphaSortPrograms= (a: CPSProgram, b: CPSProgram) => {
  if (a.Short_Name < b.Short_Name) {
    return -1;
  } else if (a.Short_Name === b.Short_Name) {
    return 0;
  } else if (a.Short_Name > b.Short_Name) {
    return 1;
  }
};

export const getHSProgramIDs = (programs: CPSProgram[]): string[] => {
  return programs.filter( isHSProgram ).sort( alphaSortPrograms ).map( program => program.ID );
};

export const getESProgramIDs = (programs: CPSProgram[]): string[] => {
  return programs.filter( isESProgram ).sort( alphaSortPrograms ).map( program => program.ID );
};

export const getHSProgramIDsByType = (programs: CPSProgram[]): {[type: string]: string[]} => {

  const hsPrograms = programs.filter( isHSProgram );

  let hsProgramIDsByType = {};
  let allProgramIDs = [];
  for (let i=0; i<hsProgramGroups.length; i++) {
    const group = hsProgramGroups[i];
    hsProgramIDsByType[group.groupName] = group.programIDs;

    allProgramIDs.push(...group.programIDs);
  }

  // find all programs that weren't specified in config and add them
  // with a default group 
  const missingPrograms = hsPrograms.filter( program => ! allProgramIDs.some( id => id === program.ID ) );

  for (let i=0; i<missingPrograms.length; i++) {
    const missingProgram = missingPrograms[i];
    const programType = missingProgram.Program_Type;
    const programID = missingProgram.ID;

    if (!hsProgramIDsByType[programType]) {
      hsProgramIDsByType[programType] = [];
    } 
    hsProgramIDsByType[programType].push(programID);
  }

  return hsProgramIDsByType;
};

export const initializeOutcomes = (programs: CPSProgram[]): {[id: string]: Outcome} => {
  let outcomes = {};
  for (let i=0; i<programs.length; i++) {
    const program = programs[i];
    const id = program.ID;
    outcomes[id] = {
      application: SuccessChance.NOTIMPLEMENTED,
      selection: SuccessChance.NOTIMPLEMENTED
    }
  }
  return outcomes;
};

export const calculateOutcomes = (programs: CPSProgram[], studentData: StudentData, reqFnLookup: ReqFnLookup): {[id: string]: Outcome} => {
  let outcomes = {};
  for (let i=0; i<programs.length; i++) {
    const program = programs[i];
    const id = program.ID;
    const reqFns = reqFnLookup(program);
    try {
      outcomes[id] = {
        application: reqFns.application(studentData, program).outcome,
        selection: reqFns.selection(studentData, program).outcome
      }
    } catch(e) {
      console.error(e);
      console.error(program);
      console.warn(reqFns)
    }
  }
  return outcomes;
};
