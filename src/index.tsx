import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {WarpedApp, ReturnTypes} from 'warped-components';

import App, {SFCExample} from './components/App';
import {makeHTTPDriver} from '@cycle/http';
import {AppState} from './appState';

const drivers = {
  http: makeHTTPDriver(),
};

const initialState: AppState = {
  app: {
    data: '',
  },
  gh: {
    username: '',
  },
};

export type AppSources = ReturnTypes<typeof drivers>;

ReactDOM.render(
  <WarpedApp initialState={initialState} drivers={drivers}>
    {/* Not supplying the `greeting` prop here is a compile-time error */}
    <App greeting={'Nice to meet you, '} />
    <SFCExample />
  </WarpedApp>,
  document.getElementById('app'),
);
