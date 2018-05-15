import * as Redux from "redux";

import { AppState } from "shared/types";

import { studentDataReducer } from "./student-data-reducer";
import { programOutcomesReducer } from "./program-outcomes-reducer";
import { loadingStatusReducer } from "./loading-status-reducer";
import { dataReducer } from "./data-reducer";

export const rootReducer: Redux.Reducer<AppState> = Redux.combineReducers({
  studentData: studentDataReducer,
  programOutcomes: programOutcomesReducer,
  loadingStatus: loadingStatusReducer,
  data: dataReducer
});

