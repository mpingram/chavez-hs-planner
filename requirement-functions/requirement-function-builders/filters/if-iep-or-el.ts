import { ReqFnFilter} from "./";

export const ifIEPorEL: ReqFnFilter = (student, program) => {
  if (student.iep || student.ell) {
    return true;
  } else {
    return false;
  }
}
