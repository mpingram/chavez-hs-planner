import HSReqFilter from "shared/types/hs-req-filter";

export const ifIEPorEL: HSReqFilter = (student, program) => {
  if (student.iep || student.ell) {
    return true;
  } else {
    return false;
  }
}
