import { Gender } from "shared/enums";
import { GradeLevel, StudentLocation } from "shared/types";

type LetterGrade = "A" | "B" | "C" | "D" | "F";

export interface StudentData {
    gender: Gender
    location: StudentLocation
    gradeLevel: number
    prevGradeLevel: number
    skippedGrade7OrRepeatedGrade8: boolean
    currESProgramID: string
    ell: boolean
    iep: boolean
    attendancePercentage: number
    gpa: number
    siblingHSSchoolIDs: string[]
    seTestPercentile: number
    nweaPercentileMath: number
    nweaPercentileRead: number
    subjGradeMath: LetterGrade
    subjGradeRead: LetterGrade
    subjGradeSci: LetterGrade
    subjGradeSocStudies: LetterGrade
}
