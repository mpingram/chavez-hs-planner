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

const calculateGPA = (...grades: number[]): number => {
  const numGrades = grades.length;
  let gradePointSum = 0;
  for (let i=0; i < numGrades; i++) {
    const points = toPoints(grades[i]);
    if (points === null) {
      return null;
    } else {
      gradePointSum += points;
    }
  }
  return gradePointSum / numGrades;
};

export default calculateGPA;
