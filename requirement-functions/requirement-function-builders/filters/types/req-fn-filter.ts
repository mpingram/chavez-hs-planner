import { StudentData, Program } from "shared/types";

type ReqFnFilter = (student: StudentData, program: Program) => boolean;

export {ReqFnFilter};
