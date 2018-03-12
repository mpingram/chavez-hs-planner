import HSReqFilter from "shared/types/hs-req-filter";
import CPSProgram from "shared/types/cps-program";

import {ifInAttendBound} from "./";

const ifInAttendBoundOf = (...schoolIDs: string[]): HSReqFilter => {
  return (student, program) => {
    // FIXME: brittle -- relies on knowledge that ifInAttendBound only needs School_ID property.
    // solution for future: ifInAttendBound takes anything that satisfies a {School_ID: number} interface?
    return schoolIDs.some( schoolID => ifInAttendBound(student, {School_ID: schoolID} as CPSProgram) );
  };
}

