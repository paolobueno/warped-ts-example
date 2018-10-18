import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {WarpedApp, SourcesOf} from 'warped-components';

import App, {SFCApp} from './components/App';
import {makeHTTPDriver} from '@cycle/http';
import {AppState} from './appState';

const drivers = {
  http: makeHTTPDriver(),
};

const initialState: AppState = {
  app: {
    data: '',
  },
};

export type AppSources = SourcesOf<typeof drivers>;

ReactDOM.render(
  <WarpedApp initialState={initialState} drivers={drivers}>
    {/* Not supplying the `greeting` prop here is a compile-time error */}
    <App greeting={'Nice to meet you, '} />
    <SFCApp />
  </WarpedApp>,
  document.getElementById('app'),
);
