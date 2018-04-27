import { ReqFnFilter} from "./";

export const both = (...filters: ReqFnFilter[]): ReqFnFilter => {
  return (student, program) => {
    return filters.every( filter => filter(student, program) );
  }
};
