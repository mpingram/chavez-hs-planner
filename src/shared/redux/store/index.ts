import { createStore } from "redux";
import { rootReducer } from "shared/redux/reducers/";

const store = createStore(rootReducer);

export default store;
