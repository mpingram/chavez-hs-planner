import { LetterGrade } from "shared/types";

const toPoints = (letterGrade): number | null => {
  switch(letterGrade){
    case "A":
      return 4;
    case "B":
      return 3;
    case "C":
      return 2;
    case "D":
      return 1;
    case "F":
      return 0;
    case null:
      return null;
    default:
      throw new Error(`Unexpected letter grade: ${letterGrade}`);
  }
}

const calculateGPA = (...letterGrades: LetterGrade[]): number => {
  const numGrades = letterGrades.length;
  let gradePointSum = 0;
  
  // convert each letter grade to points from 0 to 4.
  for (let i=0; i < letterGrades.length; i++) {
    const letterGrade = letterGrades[i];

    // if any grades are null, return early with null.
    if (letterGrade === null) {
      return null;
    }

    const points = toPoints(letterGrade);
    gradePointSum += points;
  }
  // average the points from each letter grade.
  return gradePointSum / numGrades;
};

export default calculateGPA;
