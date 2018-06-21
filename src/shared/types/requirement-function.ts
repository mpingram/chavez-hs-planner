import { Program, StudentData }from "shared/types";
import { SuccessChance } from "shared/enums/success-chance";

type RequirementFunction = (student: StudentData, program: Program) => SuccessChance;

export {RequirementFunction};
