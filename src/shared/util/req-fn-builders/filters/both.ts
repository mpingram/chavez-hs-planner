import HSReqFilter from "shared/types/hs-req-filter";

export const both = (...filters: HSReqFilter[]): HSReqFilter => {
  return (student, program) => {
    return filters.every( filter => filter(student, program) );
  }
};
