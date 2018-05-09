import { fromJS, List } from  "immutable";

import { 
  AppState,
  Program,
  ProgramDictionary,
  ProgramGroup,
  ProgramOutcome,
  StudentData,
} from "shared/types";

import {
  SuccessChance,
  Gender
} from "shared/enums";

import distanceBetweenCoords from "shared/util/distance-between-coords";
import getCombinedSuccessChance from "shared/util/get-combined-success-chance";

import { 
  getHSPrograms, 
  getNonHSPrograms 
} from "shared/util/data-access";

let hsPrograms;
let nonHSPrograms;

const getHSSchoolNames = (hsPrograms: Program[]): {[schoolID: string]: string} => {
  let hsSchools = {};
  hsPrograms.forEach( program => {
    const schoolID = program.schoolID;
    hsSchools[schoolID] = program.schoolNameShort;
  });
  return hsSchools;
};

interface OutcomeDictionary {
  [programID: string]: ProgramOutcome
}

const getOutcome = (student: StudentData, program: Program): ProgramOutcome => {
  const applicationChance = program.applicationReqFn(student, program);
  const selectionChance = program.selectionReqFn(student, program);
  const overallChance = getCombinedSuccessChance(applicationChance, selectionChance);
  const distance = distanceBetweenCoords(student.location.geo, program.schoolLocation);

  return {
    programID: program.id,
    applicationChance: applicationChance,
    selectionChance: selectionChance,
    overallChance: overallChance,
    distance: distance
  }
};

const createInitialOutcome = (student: StudentData, program: Program): ProgramOutcome => {
  const distance = distanceBetweenCoords(student.location.geo, program.schoolLocation);
  return {
    programID: program.id,
    distance: distance,
    applicationChance: SuccessChance.NOTIMPLEMENTED,
    selectionChance: SuccessChance.NOTIMPLEMENTED,
    overallChance: SuccessChance.NOTIMPLEMENTED,
  }
};

const createProgramDictionary = (programs: Program[]): ProgramDictionary => {
  let dict = {};
  for (let i=0; i<programs.length; i++) {
    const program = programs[i];
    dict[program.id] = program;
  }
  return dict;
};

const createOutcomeDictionary = (outcomes: ProgramOutcome[]): OutcomeDictionary => {
  let dict = {};
  for (let i=0; i<outcomes.length; i++) {
    const outcome = outcomes[i];
    dict[outcome.programID] = outcome;
  }
  return dict;
};

const initialStudentData = {
  gender: Gender.NOANSWER,
  location: {
    address: "",
    tier: "",
    geo: {latitude: 0, longitude: 0},
  },
  gradeLevel: 0,
  prevGradeLevel: 0,
  iep: false,
  ell: false,
  attendancePercentage: 0,
  gpa: null,
  skippedGrade7OrRepeatedGrade8: false,

  currESProgramID: undefined,
  siblingHSSchoolIDs: [],
  seTestPercentile: 0,
  nweaPercentileMath: 0,
  nweaPercentileRead: 0,
  subjGradeMath: null,
  subjGradeRead: null,
  subjGradeSci: null,
  subjGradeSocStudies: null,
};

const hsSchoolNames = getHSSchoolNames(hsPrograms);

const hsProgramDict: ProgramDictionary = createProgramDictionary(hsPrograms);
const nonHSProgramDict: ProgramDictionary = createProgramDictionary(nonHSPrograms);

const initialHSProgramOutcomes = hsPrograms.map( program => createInitialOutcome(initialStudentData, program) );
const hsProgramOutcomeDict: OutcomeDictionary = createOutcomeDictionary(initialHSProgramOutcomes);

const initialSchoolData = {
  hsPrograms: hsProgramDict,
  esPrograms: nonHSProgramDict,
  hsSchoolNames: hsSchoolNames,
  hsProgramGroups: [],
  hsProgramOutcomes: hsProgramOutcomeDict
}


let initialState: AppState = fromJS({ 
  studentData: initialStudentData,
  selectedHSProgramID: null,
  schoolData: initialSchoolData
});

export default initialState;
