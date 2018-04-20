import ProgramRequirementFunction from "shared/types/program-requirement-function";

interface Program {
  id: string

  schoolNameShort: string
  schoolNameLong: string
  schoolID: string
  schoolLocation: {
    latitude: number,
    longitude: number
  }

  programName: string
  programType: string
  category: string

  cpsPageURL: string
  hsBoundURL: string
  schoolPageURL: string

  applicationReqDescription: string
  selectionReqDescription: string

  applicationReqFn: ProgramRequirementFunction,
  selectionReqFn: ProgramRequirementFunction
}

export default Program;