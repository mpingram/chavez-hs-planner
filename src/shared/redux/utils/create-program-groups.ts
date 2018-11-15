import {
  Program,
  ProgramDictionary,
  ProgramGroupDictionary,
} from "../../../shared/types";

/*
 * Creates a data structure that groups programs together.
 * */
export const createProgramGroupDictionary = (hsPrograms: ProgramDictionary): ProgramGroupDictionary => {
  let programGroups: ProgramGroupDictionary = {};
  Object.keys(hsPrograms).forEach( programID => {
    
    const program: Program = hsPrograms[programID];
    const programType = program.programType;

    // if this program group does not already exist, 
    // create a new program group and add it to the program group dict.
    if (programGroups[programType] === undefined) {

      const newProgramGroup = {
        id: programType,
        name: programType,
        programIDs: [program.id]
      };
      programGroups[programType] = newProgramGroup;

    // otherwise, add this program's id to the existing group.
    } else {
      programGroups[programType].programIDs.push(program.id);
    }
  });

  return programGroups;
};
