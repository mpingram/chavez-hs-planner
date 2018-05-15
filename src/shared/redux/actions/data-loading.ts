import { 
  AppState,
  ProgramDictionary,
  ProgramTypeIDTable
} from "shared/types";

import { ActionType } from "shared/enums";

import {
  HS_PROGRAMS_URL,
  NON_HS_PROGRAMS_URL,
  SE_CUTOFF_SCORES_URL,
  NON_SE_CUTOFF_SCORES_URL,
  PROGRAM_TYPE_ID_TABLE_URL,
  SCHOOL_ATTENDANCE_BOUNDARY_TABLE_URL,
  TRACT_TIER_TABLE_URL
} from "shared/constants";

import { createProgramGroupDictionary } from "../utils"

import { updateProgramOutcomes } from "./update-program-outcomes";

const fetchJSONFrom = (url: string): Promise<any> => {
  return fetch(HS_PROGRAMS_URL).then( 
    res => {
      if (res.ok) {
        return res.json();
      } else {
        console.error(`Request for ${HS_PROGRAMS_URL} failed with ${res.statusText}`);
      }
    },
    err => {
      console.error(err);
      return null;
    }
  );
};

const updateHSPrograms = (data) => {
  return {
    type: ActionType.UpdateHSPrograms,
    payload: data
  }
}
const loadHSPrograms = () => {
  return (dispatch) => {
    fetchJSONFrom(HS_PROGRAMS_URL).then( json => {
      dispatch( updateHSPrograms(json) );
    });
  }
};

const updateNonHSPrograms = (data) => {
  return {
    type: ActionType.UpdateNonHSPrograms,
    payload: data
  }
};
const loadNonHSPrograms = () => {
  return (dispatch) => {
    fetchJSONFrom(NON_HS_PROGRAMS_URL).then( json => {
      dispatch( updateNonHSPrograms(json) );
    });
  }
};

const updateSECutoffScores = (data) => {
  return {
    type: ActionType.UpdateSECutoffScores,
    payload: data
  }
};
const loadSECutoffScores = () => {
  return (dispatch) => {
    fetchJSONFrom(SE_CUTOFF_SCORES_URL).then( json => {
      dispatch( updateSECutoffScores(json) );
    });
  }
};

const updateNonSECutoffScores = (data) => {
  return {
    type: ActionType.UpdateNonSECutoffScores,
    payload: data
  }
};
const loadNonSECutoffScores = () => {
  return (dispatch) => {
    fetchJSONFrom(NON_SE_CUTOFF_SCORES_URL).then( json => {
      dispatch( updateNonSECutoffScores(json) );
    });
  }
};

const updateProgramTypeIDTable = (data) => {
  return {
    type: ActionType.UpdateProgramTypeIDTable,
    payload: data
  }
};
const loadProgramTypeIDTable = () => {
  return (dispatch) => {
    fetchJSONFrom(PROGRAM_TYPE_ID_TABLE_URL).then( json => {
      dispatch( updateProgramTypeIDTable(json) );
    });
  }
};

const updateSchoolAttendanceBoundaryTable = (data) => {
  return {
    type: ActionType.UpdateSchoolAttendanceBoundaryTable,
    payload: data
  }
};
const loadSchoolAttendanceBoundaryTable = () => {
  return (dispatch) => {
    fetchJSONFrom(SCHOOL_ATTENDANCE_BOUNDARY_TABLE_URL).then( json => {
      dispatch( updateSchoolAttendanceBoundaryTable(json) );
    });
  }
};

const updateTractTierTable = (data) => {
  return {
    type: ActionType.UpdateTractTierTable,
    payload: data
  }
};
const loadTractTierTable = () => {
  return (dispatch) => {
    fetchJSONFrom(TRACT_TIER_TABLE_URL).then( json => {
      dispatch( updateTractTierTable(json) );
    });
  }
};

const loadingData = () => {
  return {
    type: ActionType.LoadingData
  }
};
const dataLoaded = () => {
  return {
    type: ActionType.DataLoaded
  }
};

const updateProgramGroups = (hsPrograms: ProgramDictionary, programTypeIDTable: ProgramTypeIDTable) => {
  return {
    type: ActionType.UpdateHSProgramGroups,
    payload: createProgramGroupDictionary(hsPrograms, programTypeIDTable)
  }
};

export const loadAllData = () => {
  // dispatch all data loading actions, wrapped
  // by Promise.all().
  // TODO error handling?
  return (dispatch, getState) => {
    dispatch( loadingData() );
    return Promise.all([
      loadHSPrograms,
      loadNonHSPrograms,
      loadSECutoffScores,
      loadNonSECutoffScores,
      loadProgramTypeIDTable,
      loadSchoolAttendanceBoundaryTable,
      loadTractTierTable,
    ]).then( results => {

      dispatch( dataLoaded() );
      const state: AppState = getState();
      // create program groups
      dispatch( 
        updateProgramGroups(state.data.hsPrograms, state.data.programTypeIDTable)
      );
      // create program outcomes
      dispatch(
        updateProgramOutcomes(state.studentData, state.data.hsPrograms)
      );
    });
  }
};
