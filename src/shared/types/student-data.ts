import { Gender } from "shared/enums";
import { 
  LetterGrade,
  GradeLevel, 
  StudentLocation 
} from "shared/types";

export interface StudentData {
    gender: Gender | null
    location: StudentLocation | null
    gradeLevel: number | null
    prevGradeLevel: number | null
    skippedGrade7OrRepeatedGrade8: boolean | null
    currESProgramID: string | null
    ell: boolean | null
    iep: boolean | null
    attendancePercentage: number | null
    gpa: number | null
    siblingHSSchoolIDs: string[] | null
    seTestPercentile: number | null
    nweaPercentileMath: number | null
    nweaPercentileRead: number | null
    subjGradeMath: LetterGrade | null
    subjGradeRead: LetterGrade | null
    subjGradeSci: LetterGrade | null
    subjGradeSocStudies: LetterGrade | null
}
