import {
  Program,
  ProgramDictionary,
  RawProgram,
  RequirementFunctionDictionary
} from "shared/types";


export const createHSProgramDictionary = (rawProgramData: RawProgram[], requirementFunctions: RequirementFunctionDictionary): ProgramDictionary => {
  let programDictionary: ProgramDictionary = {};

  let missingReqFns: any = {};
  let orphanedReqFns: any = [];

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

  if (process.env.NODE_ENV === 'development') {
    // find orphaned requirement functions, which are requirement functions
    // that exist in the requirement function dictionary but are not needed by
    // any of the programs in rawProgramData.
    const reqFnIDs = Object.keys(requirementFunctions);
    reqFnIDs.forEach( id => {
      const isOrphaned = !rawProgramData.some(program => program.applicationReqFnID === id || program.selectionReqFnID === id);
      if (isOrphaned) {
        orphanedReqFns.push(id);
      }
    });
    
    if (orphanedReqFns.length > 0) {
      console.warn(`There are ${orphanedReqFns.length} unused requirement functions.\n\nYou can safely remove them from the list of requirement functions in src/shared/requirement-functions/requirement-functions.ts. The IDs of the unused requirement functions are printed below:`);
      console.log("Orphaned:");
      console.log(JSON.stringify(orphanedReqFns, null, 2));
    }
    const numMissingReqFns = Object.keys(missingReqFns).length;
    if (numMissingReqFns > 0) {
      console.error(`There are ${numMissingReqFns} MISSING requirement functions.\n\nYou must write new implementations for these requirement functions in src/shared/requirement-functions/requirement-functions.ts. A template for the missing requirement functions is printed below.`);
      console.log("Missing:");
      console.log(JSON.stringify(missingReqFns, null, 2));
    }
  }
  
  return programDictionary;
};
