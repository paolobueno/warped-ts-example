import createReducer, {noopAction, ActionHandler} from 'warped-reducers';
import {append, sortWith, identity, ascend} from 'ramda';
import {Lens} from 'monocle-ts';
import {AppState, baseStateFor} from '../../appState';
import {setLens, normalize} from '../../util/lenses';

const lensProp = Lens.fromNullableProp<AppComponentState>();

const baseLens = baseStateFor('app');
export const dataLens = baseLens.compose(lensProp('data', ''));
export const itemsLens = normalize(baseLens.compose(lensProp('items', [])))(
  sortWith([ascend(identity)]),
);

export interface AppComponentState {
  data?: string;
  items?: number[];
}

// We use warped-reducers to create our reducer and actions.
export const {types, actions, reducer, typedActions} = createReducer<AppState>('App')({
  loadData: noopAction as ActionHandler<{username: string}, any>,
  setData: setLens(dataLens),
  addItem: (item: number) => itemsLens.modify(append(item)),
});
