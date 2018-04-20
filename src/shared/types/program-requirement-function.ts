import StudentData from "shared/types/student-data";
import Program from "shared/types/program";
import SuccessChance from "shared/enums/success-chance";

type ProgramRequirementFunction = (student: StudentData, program: Program) => SuccessChance;

export default ProgramRequirementFunction;
