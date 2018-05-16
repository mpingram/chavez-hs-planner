import {
  Program,
  ProgramDictionary
} from "shared/types";

import { requirementFunctions } from "shared/requirement-functions";

export const createHSProgramDictionary = (rawProgramData): ProgramDictionary => {
  let programDictionary: ProgramDictionary = {};
  rawProgramData.forEach( rawProgram => {

    const applicationReqFn = requirementFunctions[rawProgram.applicationReqFnID];
    const selectionReqFn = requirementFunctions[rawProgram.selectionReqFnID];
    // throw an error if we can't find this requirement function. This is an error in
    // the data -- probably unrecoverable.
    if (applicationReqFn === undefined || selectionReqFn === undefined) {
      throw new Error(`Cannot find requirement functions for program ${rawProgram.programName}`);
    }

    // create a Program object from rawProgram by removing requirement
    // function ids and replacing them with the actual requirement functions
    const program: Program = Object.assign({}, rawProgram, {
      applicationReqFnID: undefined,
      selectionReqFnID: undefined,
      applicationReqFn: applicationReqFn,
      selectionReqFn: selectionReqFn
    });

    // make an entry in programDictionary for each program
    programDictionary[program.id] = program;
  });
  
  return programDictionary;
};
