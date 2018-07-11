import {
  Program,
  ProgramDictionary,
  RawProgram,
  RequirementFunctionDictionary
} from "shared/types";

export const createHSProgramDictionary = (rawProgramData: RawProgram[], requirementFunctions: RequirementFunctionDictionary): ProgramDictionary => {
  let programDictionary: ProgramDictionary = {};

  let missingReqFns: any = {};
  let orphanedReqFns: any = {};

  rawProgramData.forEach( rawProgram => {

    const applicationReqFn = requirementFunctions[rawProgram.applicationReqFnID];
    const selectionReqFn = requirementFunctions[rawProgram.selectionReqFnID];
    if (applicationReqFn === undefined) {
      missingReqFns[rawProgram.applicationReqFnID] = {
        id: rawProgram.applicationReqFnID,
        desc: rawProgram.applicationReqDescription,
        fn: ''
      };
    }
    if (selectionReqFn === undefined) {
      missingReqFns[rawProgram.selectionReqFnID] = {
        id: rawProgram.selectionReqFnID,
        desc: rawProgram.selectionReqDescription,
        fn: ''
      };
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

  const numMissingReqFns = Object.keys(missingReqFns).length;
  if (numMissingReqFns > 0) {
    console.error(`Missing ${numMissingReqFns} requirement functions.`);
    console.log("Missing:");
    console.log(JSON.stringify(missingReqFns, null, 2));
  }
  
  return programDictionary;
};
