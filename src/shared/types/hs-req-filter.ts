import StudentData from "shared/types/student-data";
import CPSProgram from "shared/types/cps-program";

type HSReqFilter = (student: StudentData, program: CPSProgram) => boolean;

export default HSReqFilter;
