import createReducer, {noopAction, ActionHandler, getActions, getTypes} from 'warped-reducers';
import {append, sortWith, identity, ascend} from 'ramda';
import {Lens} from 'monocle-ts';
import {AppState, baseStateFor} from '../../appState';
import {setLens, normalize} from '../../util/lenses';

const lensProp = Lens.fromNullableProp<AppComponentState>();

const baseLens = baseStateFor('app');
export const dataLens = baseLens.compose(lensProp('data', ''));
export const itemsLens = normalize<number[]>(sortWith([ascend(identity)]))(
  baseLens.compose(lensProp('items', [])),
);

export interface AppComponentState {
  data?: string;
  items?: number[];
}

// We use warped-reducers to create our reducer and actions.
export const {reducer, handlers} = createReducer<AppState>('App')({
  loadData: noopAction as ActionHandler<{username: string}, any>,
  setData: setLens(dataLens),
  addItem: (item: number) => itemsLens.modify(append(item)),
});


export const actions = getActions(handlers);
export const types = getTypes(handlers);
