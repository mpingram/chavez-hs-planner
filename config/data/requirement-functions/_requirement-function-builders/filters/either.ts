import HSReqFilter from "shared/types/hs-req-filter";

export const either = (...filters: HSReqFilter[]): HSReqFilter => {
  return (student, program) => {
    return filters.some( filter => filter(student, program) );
  }
};
