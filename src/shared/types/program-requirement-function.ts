import StudentData from "shared/types/student-data";
import Program from "shared/types/program";
import HSReqFnProgress from "shared/types/hs-req-fn-progress";
import SuccessChance from "shared/enums/success-chance";

type ProgramRequirementFunction = (student: StudentData, program: Program) => {outcome: SuccessChance, 
                                                                              progress?: HSReqFnProgress};

export default ProgramRequirementFunction;
