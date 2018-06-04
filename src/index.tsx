import * as React from "react";
import { render } from "react-dom";
import { store } from "shared/redux/store";
import { Provider } from "react-redux";

import PathToHS from "./path-to-hs/path-to-hs"

render( (
  <Provider store={store}>
    <PathToHS>
    </PathToHS>
  </Provider>
), document.getElementById("root") );
