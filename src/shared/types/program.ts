import ProgramRequirementFunction from "shared/types/program-requirement-function";

interface Program {
  id: string
  shortname: string
  longname: string
  programType: string

  cpsLink: string
  hsBoundLink: string
  schoolPageLink: string

  applicationReqDescription: string
  selectionReqDescription: string

  applicationReqFn: ProgramRequirementFunction,
  selectionReqFn: ProgramRequirementFunction
}

export default Program;
