import {warped, WarpedSources, Warped} from 'warped-components';
import {
  createReducer, noopAction, getTypes, getActions,
  PayloadsOf,
  ActionHandler
} from 'warped-reducers';
import * as React from 'react';
import {Lens} from 'monocle-ts';
import {HTTPSource} from '@cycle/http';

interface State {
  app: {
    data: string;
  }
}

const dataState = Lens.fromPath <State>() (['app', 'data'])

export const selectors = {
  data: dataState.get
};
export const {handlers, reducer} = createReducer <State>('App') ({
  setData: dataState.set,
  loadData: noopAction as ActionHandler<{username: string}, State>,
});
const types = getTypes (handlers);
const actions = getActions (handlers);

// Use `WarpedSources<S, P>` to get the sources injected into your Cycle apps
type Sources = WarpedSources<State, PayloadsOf<typeof handlers>> & {
  http: HTTPSource
};
export const effects = ({action, http}: Sources) => ({
  http: action.select (handlers.loadData).map (({payload: {username}}) => ({
    url: `https://api.github.com/users/${username}`,
    category: types.loadData
  })),
  action: http.select (types.loadData).flatten ().map (({body: {name}}) =>
    actions.setData (name)
  )
});

const warp = warped ({reducer, effects, selectors, actions});
// Use Warped<T> to get the injected props for your components,
// combine with other props with with `&`
type Props = Warped<typeof warp> & {otherProp?: string};

export const App = ({data, loadData}: Props) => (
  <div>
    <h1>{data || 'name unknown'}</h1>
    <button onClick={() => loadData({username: 'Avaq'})}>Load!</button>
  </div>
);

export default warp (App);
