import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../../../shared/redux/reducers";

import { loadAllData } from "../actions";

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

/* load all app data on initialization. */
store.dispatch( loadAllData() );
  
