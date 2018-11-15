import { ReqFnFilter } from "../../../../shared/types";

export const ifStudentAttendsOneOf = (...programIDs): ReqFnFilter => {
  if(programIDs.length === 0) {
    throw new Error("No parameters passed to ifStudentAttendsOneOf -- usage: ifStudentAttendsOneOf(programID_1, programID_2, programID_3 ... )(student, program)");
  }
  return (student, program) => {
    return programIDs.some( programID => programID === student.currESProgramID );
  }
};
