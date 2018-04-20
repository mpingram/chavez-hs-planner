import { fromJS, List } from  "immutable";

import AppState from "shared/types/app-state";
import Program from "shared/types/program";
import ProgramGroup from "shared/types/program-group";
import ProgramOutcome from "shared/types/program-outcome";
import SuccessChance from "shared/enums/success-chance";

import StudentData from "shared/types/student-data";
import Gender from "shared/enums/gender";
import ProgramDictionary from "shared/types/program-dictionary";

import distanceBetweenCoords from "shared/util/distance-between-coords";
import getCombinedSuccessChance from "shared/util/get-combined-success-chance";

import {PROGRAM_CATEGORY_HS, PROGRAM_CATEGORY_ES} from "shared/constants";
import {getAllPrograms} from "shared/util/data-access";
const allPrograms: Program[] = getAllPrograms();

declare const require: any;
const programGroups: ProgramGroup[] = require("../../shared/data/hs_groups.json");

const getHSPrograms = (programs: Program[]): Program[] => {
  return programs.filter( program => program.category === PROGRAM_CATEGORY_HS );
};

const getESPrograms = (programs: Program[]): Program[] => {
  return programs.filter( program => program.category === PROGRAM_CATEGORY_ES );
};

const getHSSchoolNames = (programs: Program[]): {[schoolID: string]: string} => {
  let hsSchools = {};
  programs.forEach( program => {
    if (program.category === PROGRAM_CATEGORY_HS) {
      const schoolID = program.schoolID;
      hsSchools[schoolID] = program.schoolNameShort;
    }
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

const hsPrograms = getHSPrograms(allPrograms);
const hsProgramDict: ProgramDictionary = createProgramDictionary(hsPrograms);
const esPrograms = getESPrograms(allPrograms);
const esProgramDict: ProgramDictionary = createProgramDictionary(esPrograms);
const hsSchoolNames = getHSSchoolNames(allPrograms);

const initialHSProgramOutcomes = hsPrograms.map( program => createInitialOutcome(initialStudentData, program) );
const hsProgramOutcomeDict: OutcomeDictionary = createOutcomeDictionary(initialHSProgramOutcomes);

const initialSchoolData = {
  hsPrograms: hsPrograms,
  esPrograms: esPrograms,
  hsSchoolNames: hsSchoolNames,
  hsProgramGroups: programGroups,
  hsProgramOutcomes: hsProgramOutcomeDict
}


let initialState: AppState = fromJS({ 
  studentData: initialStudentData,
  selectedHSProgramID: null,
  schoolData: initialSchoolData
});

export default initialState;
