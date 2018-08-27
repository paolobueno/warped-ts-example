import * as React from "react";
import * as ReactDOM from "react-dom";
import { WarpedApp } from 'warped-components';

import App, { SFC, State } from "./components/App";
import { makeHTTPDriver } from "@cycle/http";

const drivers = {
  http: makeHTTPDriver()
}

const initialState: State = {
  app: {
    data: '',
  },
};

ReactDOM.render(
  <WarpedApp initialState={initialState} drivers={drivers}>
    {/* Not supplying the `greeting` prop here is a compile-time error */}
    <App greeting={'Nice to meet you, '} />
    <SFC />
  </WarpedApp>,
  document.getElementById("app")
);
