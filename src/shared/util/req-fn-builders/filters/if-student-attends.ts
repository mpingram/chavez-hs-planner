import HSReqFilter from "shared/types/hs-req-filter";

export const ifStudentAttends = (...programIDs): HSReqFilter => {
  return (student, program) => {
    return programIDs.some( programID => programID === student.currESProgramID );
  }
};
