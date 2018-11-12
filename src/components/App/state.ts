import createReducer, {getActions, getTypes} from 'warped-reducers';
import {append, sortWith, identity, ascend} from 'ramda';
import {sort} from 'fp-ts/lib/Array';
import {Lens} from 'monocle-ts';
import {AppState, baseStateFor} from '../../appState';
import {normalize} from '../../util/lenses';
import {ordNumber} from 'fp-ts/lib/Ord';

const lensProp = Lens.fromNullableProp<AppComponentState>();

const sortNumRamda = normalize<number[]>(sortWith([ascend(identity)]));
const sortNum = normalize(sort(ordNumber));

const baseLens = baseStateFor('app');
export const itemsLens = sortNum(baseLens.compose(lensProp('items', [])));
export const itemsRamdaLens = sortNumRamda(baseLens.compose(lensProp('items', [])));

export interface AppComponentState {
  data?: string;
  items?: number[];
  query?: string;
}

// We use warped-reducers to create our reducer and actions.
export const {reducer, handlers} = createReducer<AppState>('App')({
  addItem: (item: number) => itemsLens.modify(append(item)),
});

export const actions = getActions(handlers);
export const types = getTypes(handlers);
