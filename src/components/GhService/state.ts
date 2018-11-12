import createReducer, {noopAction, ActionHandler, getActions, getTypes} from 'warped-reducers';
import {Lens} from 'monocle-ts';
import {AppState, baseStateFor} from '../../appState';

const lensProp = Lens.fromNullableProp<GhServiceState>();

const baseLens = baseStateFor('gh');
export const usernameLens = baseLens.compose(lensProp('username', ''));

export interface GhServiceState {
  username: string,
}

// We use warped-reducers to create our reducer and actions.
export const {reducer, handlers} = createReducer<AppState>('App')({
  loadUser: noopAction as ActionHandler<{username: string}, any>,
  setUser: usernameLens.set,
});

export const actions = getActions(handlers);
export const types = getTypes(handlers);
