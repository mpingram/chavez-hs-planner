import { 
  Program,
  CutoffScores,
  TieredCutoffScores
} from "shared/types";

const HS_PROGRAMS_URL = "data/hs-programs.json";
const NON_HS_PROGRAMS_URL = "data/non-hs-programs.json";
const SE_CUTOFF_SCORES_URL = "data/se-cutoff-scores.json";
const NON_SE_CUTOFF_SCORES_URL = "data/non-se-cutoff-scores.json";
const PROGRAM_TYPE_ID_TABLE_URL = "data/program-type-id-table.json";
const SCHOOL_ATTENDANCE_BOUNDARY_TABLE_URL = "data/school-attendance-boundary-table.json";
const TRACT_TIER_TABLE_URL = "data/tract-tier-table.json";

const makeDataRequest = (url: string): Promise<any> => {
  return new Promise( (resolve, reject) => {
    fetch(url).then( res => {
      if (!res.ok) {
        reject(`Request failed with status ${res.statusText}`);
      }
      return res.json();
    }).then( json => {
      resolve(json); 
    }).catch( err => {
      reject(err); 
    });
  });
};

export const getHSPrograms = (): Promise<Program[]> => {
  return makeDataRequest(HS_PROGRAMS_URL);
};

export const getNonHSPrograms = (): Promise<Program[]> => {
  return makeDataRequest(NON_HS_PROGRAMS_URL);
};

export const getSECutoffScoresTable = (): Promise<{[programID: string]: TieredCutoffScores}> => {
  return makeDataRequest(SE_CUTOFF_SCORES_URL);
};

export const getNonSECutoffScoresTable = (): Promise<{[programID: string]: CutoffScores}> => {
  return makeDataRequest(NON_SE_CUTOFF_SCORES_URL);
};

export const getProgramTypeNameTable = (): Promise<{[programTypeID: string]: string}> => {
  return makeDataRequest(PROGRAM_TYPE_ID_TABLE_URL);
};

export const getTractTierTable = (): Promise<{[tract: string]: string}> => {
  return makeDataRequest(TRACT_TIER_TABLE_URL);
};

export const getSchoolAttendanceBoundaryTable = (): Promise<{[schoolID: string]: [number, number][]}> => {
  return makeDataRequest(SCHOOL_ATTENDANCE_BOUNDARY_TABLE_URL);
};
