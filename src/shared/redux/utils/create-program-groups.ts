import {
  Program,
  ProgramDictionary,
  ProgramGroupDictionary,
  ProgramTypeIDTable
} from "shared/types";

/*
 * Creates a data structure that groups programs together.
 *
 * The current implementation groups programs based on their 'programTypeID' property,
 * which should reference a program type in the programTypeIDTable passed to the function.
 * */
export const createProgramGroupDictionary = (hsPrograms: ProgramDictionary, programTypeIDTable: ProgramTypeIDTable): ProgramGroupDictionary => {
  let programGroups: ProgramGroupDictionary = {};
  Object.keys(hsPrograms).forEach( programID => {
    
    const program: Program = hsPrograms[programID];
    const programTypeID = program.programTypeID;

    // if this program group does not already exist, 
    // create a new program group and add it to the program group dict.
    if (hsPrograms[programTypeID] === undefined) {

      // to get the display name for the program group,
      // look up the display name for this program type in the program type id table.
      // (This is done to normalize the names of program types, which are frequently misspelled in the source data.)
      // If this lookup fails, give up and use the non-normalized program type name instead.
      const programTypeName = programTypeIDTable[programTypeID] !== undefined 
                          ? programTypeIDTable[programTypeID]
                          : program.programType;

      const newProgramGroup = {
        id: programTypeID,
        name: programTypeName,
        programIDs: [program.id]
      };
      programGroups[programTypeID] = newProgramGroup;

    // otherwise, add this program's id to the existing group.
    } else {
      programGroups[programTypeID].programIDs.push(program.id);
    }
  });

  return programGroups;
};
