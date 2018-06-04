import * as Redux from "redux";

import { ActionType } from "shared/enums";

interface LoadingStatus {
  loadingData: boolean,
  dataLoaded: boolean
}

import { initialLoadingStatus } from "./initial-state";

export const loadingStatusReducer: Redux.Reducer<LoadingStatus> = (loadingStatus = initialLoadingStatus, action): LoadingStatus => {

  switch(action.type) {

    case ActionType.LoadingData:
      return Object.assign({}, loadingStatus, {loadingData: true});
    case ActionType.DataLoaded:
      return Object.assign({}, loadingStatus, {loadingData: false, dataLoaded: true});

    default:
      return loadingStatus;
  }

};
