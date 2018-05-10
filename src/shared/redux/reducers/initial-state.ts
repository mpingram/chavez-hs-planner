import { 
  AppState,
  Program,
  ProgramDictionary
} from "shared/types";

import {
  getHSPrograms,
  getNonHSPrograms,
} from "shared/util/data-access";

import { initialStudentData } from "./initial-student-data";
import { createInitialProgramOutcomeDictionary } from "./create-program-outcome-dictionary";

/*
 * Load highschool programs and non-highschool programs into memory.
 * */
let hsProgramDict: ProgramDictionary = {};
let nonHSProgramDict: ProgramDictionary = {};
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

/*
 * Create map of unique school ids to school names
 * in high school programs.
 * */
let hsSchoolNameDict: {[schoolID: string]: string} = {};
Object.keys(hsProgramDict).forEach( programID => {
  const program = hsProgramDict[programID];
  // Many programs share the same schoolID and schoolName properties.
  // Only add the schoolID/schoolName to hsSchoolDict if we have not
  // already encountered this schoolID as we iterate through programs.
  if (hsSchoolNameDict[program.schoolID] === undefined) {
    hsSchoolNameDict[program.schoolID] = program.schoolNameLong;  
  }
});

export const initialState: AppState = {
  studentData: initialStudentData,
  programOutcomes: createInitialProgramOutcomeDictionary(hsProgramDict),
  hsData: {
    hsPrograms: hsProgramDict,
    esPrograms: nonHSProgramDict,
    hsSchoolNames: hsSchoolNameDict,
    hsGroups: []
  },
  selectedHSProgramID: null
};
