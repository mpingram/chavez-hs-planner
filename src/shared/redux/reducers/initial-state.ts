import { 
  AppState,
  Program,
  ProgramDictionary,
  ProgramGroupDictionary,
  School,
  SchoolDictionary
} from "shared/types";

import {
  getHSPrograms,
  getNonHSPrograms,
  getProgramTypeNameTable,
} from "shared/util/data-access";

import { initialStudentData } from "./initial-student-data";
import { createInitialProgramOutcomeDictionary } from "./create-program-outcome-dictionary";

/*
 * Load external data into memory.
 * */
let hsProgramDict: ProgramDictionary = {};
let nonHSProgramDict: ProgramDictionary = {};
let programTypeNameTable: {[programTypeID: string]: string} = {};
getHSPrograms().then( (programs: Program[]) => {
  programs.forEach( program => {
    hsProgramDict[program.id] = program;
  })
});
getNonHSPrograms().then( (programs: Program[]) => {
  programs.forEach( program => {
    nonHSProgramDict[program.id] = program;
  })
});
getProgramTypeNameTable().then( table => {
  programTypeNameTable = table;
});

/*
 * Create map of unique school ids to school names
 * in high school programs.
 * */
let hsSchoolDict: SchoolDictionary = {};
Object.keys(hsProgramDict).forEach( programID => {
  const program = hsProgramDict[programID];
  // Many programs share the same schoolID and schoolName properties.
  // Only add the schoolID/schoolName to hsSchoolDict if we have not
  // already encountered this schoolID as we iterate through programs.
  if (hsSchoolDict[program.schoolID] === undefined) {
    hsSchoolDict[program.schoolID] = {
      id: program.schoolID,
      longName: program.schoolNameLong,
      shortName: program.schoolNameShort
    }
  }
});

/*
 * Create groups of High school programs based on their programType properties.
 * */
let hsProgramGroupDict: ProgramGroupDictionary = {};
Object.keys(hsProgramDict).forEach( programID => {
  const program = hsProgramDict[programID];
  const programTypeID = program.programTypeID;

  // if this program group does not already exist, 
  // create a new program group and add it to the program group dict.
  if (hsProgramGroupDict[programTypeID] === undefined) {
    const newProgramGroup = {
      id: programTypeID,
      // look up the display name for this program type.
      name: programTypeNameTable[programTypeID],
      programIDs: [program.id]
    };
    hsProgramGroupDict[programTypeID] = newProgramGroup;

  // otherwise, add this program's id to the existing group.
  } else {
    hsProgramGroupDict[programTypeID].programIDs.push(program.id);
  }
});

export const initialState: AppState = {
  studentData: initialStudentData,
  programOutcomes: createInitialProgramOutcomeDictionary(hsProgramDict),
  hsData: {
    hsPrograms: hsProgramDict,
    esPrograms: nonHSProgramDict,
    hsSchools: hsSchoolDict,
    hsProgramGroups: hsProgramGroupDict
  },
  selectedHSProgramID: null
};
