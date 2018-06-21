import * as React from "react";
import { render } from "react-dom";
import { store } from "shared/redux/store";
import { Provider } from "react-redux";

/* style imports */
import "react-select/dist/react-select.css"

import App from "./path-to-hs/path-to-hs"

render( (
  <Provider store={store}>
    <App>
    </App>
  </Provider>
), document.getElementById("root") );
