import CPSProgram from "shared/types/cps-program";
import {CPS_JOINT_ES_AND_HS_PROGRAM_IDS} from "shared/constants";

const isJointHSAndES = (program: CPSProgram) => {
  return CPS_JOINT_ES_AND_HS_PROGRAM_IDS.some( id => id === program.ID );
}

const isESProgram = (program: CPSProgram): boolean => {
  if (program.Primary_Category === "ES") {
    return true;
  } else if (program.Primary_Category === "HS") {
    // Academic Centers are ES (6th-8th) grade programs that are held
    // in high schools. So, (confusingly) they are labeled as "HS"
    // because their school is a high school even though the programs
    // are ES programs.
    if (program.Program_Type === "Academic Center") {
      return true;
      // some programs are labeled as 'HS' but really span
      // 6th grade -> 10th grade, etc.
    } else if (isJointHSAndES(program)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default isESProgram;
