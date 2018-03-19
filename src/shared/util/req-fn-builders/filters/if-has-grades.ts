import HSReqFilter from "shared/types/hs-req-filter";
import isUninitialized from "shared/util/is-uninitialized";
import {
  isValidNwea, 
  isValidCombinedNwea, 
  isValidGPA, 
  isValidAttendance
} from "shared/util/grade-validate";

interface StudentGrades {
  nweaMath?: number
  nweaRead?: number
  nweaBoth?: number
  nweaCombined?: number
  gpa?: number
  attendance?: number
}

export const ifHasGrades = (grades: StudentGrades): HSReqFilter => {

  // check to make sure we didn't get a combination of
  // 'bothNWEA', 'nweaMath' or 'nweaRead', 'combinedNWEA'
  const hasNweaMath = grades.nweaMath !== undefined 
  const hasNweaRead = grades.nweaRead !== undefined;
  const hasNweaMathOrRead = hasNweaMath || hasNweaRead;
  const hasNweaBoth = grades.nweaBoth !== undefined;
  const hasNweaCombined = grades.nweaCombined !== undefined;
  const hasGpa = grades.gpa !== undefined;
  const hasAttendance = grades.attendance !== undefined;

  const illegalCombination = (hasNweaMathOrRead && hasNweaBoth) || (hasNweaBoth && hasNweaCombined) || (hasNweaMathOrRead && hasNweaCombined);
  if (illegalCombination) {
    throw new Error("ifHasGrades: only one of (nweaMath/nweaRead), nweaBoth, and nweaCombined may be set in the grades argument.");
  }

  // check to make sure grades isn't missing all properties
  const hasAny = hasNweaMath || hasNweaRead || hasNweaBoth || hasNweaCombined || hasGpa || hasAttendance;
  if (!hasAny) {
    throw new Error("No grade thresholds found in grades argument.");
  }

  // check to make sure passed grades are valid 
  if (hasNweaMath) {
    if (!isValidNwea(grades.nweaMath)) {
      throw new Error("Invalid value for nweaMath");
    }
  }
  if (hasNweaRead) {
    if (!isValidNwea(grades.nweaRead)) {
      throw new Error("Invalid value for nweaRead");
    }
  }
  if (hasNweaBoth) {
    if (!isValidNwea(grades.nweaBoth)) {
      throw new Error("Invalid value for nweaBoth");
    }
  }
  if (hasNweaCombined) {
    if (!isValidCombinedNwea(grades.nweaCombined)) {
      throw new Error("Invalid value for nweaCombined");
    }
  }
  if (hasGpa) {
    if (!isValidGPA(grades.gpa)) {
      throw new Error("Invalid value for gpa");
    }
  }
  if (hasAttendance) {
    if(!isValidAttendance(grades.attendance)) {
      throw new Error("Invalid value for attendance");
    }
  }

  return (student, program) => {
    // check if student passes all grade thresholds
    // compare NWEA
    // ----------
    if (hasNweaMathOrRead) {
      if (hasNweaMath) {
        if (isUninitialized(student.nweaPercentileMath)) {
          return false;
        } else if (student.nweaPercentileMath < grades.nweaMath) {
          return false;
        }
      }
      if (hasNweaRead) {
        if (isUninitialized(student.nweaPercentileRead)) {
          return false;
        } else if (student.nweaPercentileRead < grades.nweaRead) {
          return false;
        }
      }
    } else if (hasNweaBoth) {
      if (isUninitialized(student.nweaPercentileMath) || isUninitialized(student.nweaPercentileRead)) {
        return false
      } else if (student.nweaPercentileMath < grades.nweaBoth || student.nweaPercentileRead < grades.nweaBoth) {
        return false;
      }
    } else if (hasNweaCombined) {
      if (isUninitialized(student.nweaPercentileMath) || isUninitialized(student.nweaPercentileRead)) {
        return false;
      } else if (student.nweaPercentileMath + student.nweaPercentileRead < grades.nweaCombined) {
        return false;
      }
    }

    // compare GPA
    // ----
    if (hasGpa) {
      if (isUninitialized(student.gpa)) {
        return false;
      } else if (student.gpa < grades.gpa) {
        return false;
      }
    }

    // compare attendance
    // ----
    if (hasAttendance) {
      if (isUninitialized(student.attendancePercentage)) {
        return false;
      } else if (student.attendancePercentage < grades.attendance) {
        return false
      }
    }

    // fallthrough: student has passed all tests
    return true;
  }
};
