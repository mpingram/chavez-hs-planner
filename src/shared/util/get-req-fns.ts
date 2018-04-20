import ProgramRequirementFunction from "shared/types/program-requirement-function";
import CPSProgramRawData from "shared/types/cps-program-raw-data";
import HSReqFns from "shared/data/hs-req-fns";
import SuccessChance from "shared/enums/success-chance";


const getReqFns = (program: CPSProgramRawData): {application: ProgramRequirementFunction, selection: ProgramRequirementFunction} => {

  const applFnID = program.Application_Requirements_Fn;
  const selFnID = program.Program_Selections_Fn;
  const defaultReqFn: ProgramRequirementFunction = (student, program) => {
    return {outcome: SuccessChance.NOTIMPLEMENTED};
  };

  let applicationReqFn;
  let selectionReqFn;
  if (HSReqFns[applFnID]) {
    applicationReqFn = HSReqFns[applFnID].fn;
  } else {
    console.warn(`Cannot locate application requirement for ${program.Short_Name + " - " + program.Program_Type}`);
    applicationReqFn = defaultReqFn;
  }
  if (HSReqFns[selFnID]) {
    selectionReqFn = HSReqFns[selFnID].fn;
  } else {
    console.warn(`Cannot locate selection requirement for ${program.Short_Name + " - " + program.Program_Type}`);
    selectionReqFn = defaultReqFn;
  }

  return {application: applicationReqFn, selection: selectionReqFn};
};
                                        


export default getReqFns;
