import StudentData from "shared/types/student-data";
import Program from "shared/types/program";

type HSReqFilter = (student: StudentData, program: Program) => boolean;

export default HSReqFilter;
