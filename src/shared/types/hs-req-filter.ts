import { StudentData, Program } from "shared/types";

type HSReqFilter = (student: StudentData, program: Program) => boolean;

export {HSReqFilter};
