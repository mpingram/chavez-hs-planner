import { fromJS, List } from  "immutable";

import AppState from "shared/types/app-state";
import Program from "shared/types/program";
import Gender from "shared/enums/gender";
import HSGroup from "shared/types/hs-group";
import ProgramDictionary from "shared/types/program-dictionary";

import {PROGRAM_CATEGORY_HS, PROGRAM_CATEGORY_ES} from "shared/constants";
import {getAllPrograms} from "shared/util/data-access";
const allPrograms: Program[] = getAllPrograms();

declare const require: any;
const hsGroups: HSGroup[] = require("../../shared/data/hs_groups.json");

const getHSPrograms = (programs: Program[]): ProgramDictionary => {
  let keyedHSPrograms = {};
  for (let i=0; i<programs.length; i++) {
    const program = programs[i];
    if (program.category === PROGRAM_CATEGORY_HS) {
      keyedHSPrograms[program.id] = program;
    }
  }
  return keyedHSPrograms;
};

const getESPrograms = (programs: Program[]): ProgramDictionary => {
  let keyedHSPrograms = {};
  for (let i=0; i<programs.length; i++) {
    const program = programs[i];
    if (program.category === PROGRAM_CATEGORY_ES) {
      keyedHSPrograms[program.id] = program;
    }
  }
  return keyedHSPrograms;
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

let initialState: AppState = fromJS({ 
  studentData: {
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
  },

  selectedHSProgramID: null,

  schoolData: {
    hsPrograms: getHSPrograms(allPrograms),
    esPrograms: getESPrograms(allPrograms),
    hsSchoolNames: getHSSchoolNames(allPrograms),
    hsGroups: hsGroups
  }
});



export default initialState;
