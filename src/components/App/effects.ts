import {WarpedSources, PayloadTypes, combineCycles} from 'warped-components';
import {AppState} from '../../appState';
import {actions, handlers, types, queryLens} from './state';
import {AppSources} from '../..';
import dropRepeats from 'xstream/extra/dropRepeats';
import xs from 'xstream';

type Sources = WarpedSources<AppState, PayloadTypes<typeof actions>> & AppSources;
const debugCycleApp = ({action}: Sources) => ({
  http: xs.empty(),
  action: action
    .all()
    .debug()
    .filter(_ => false),
});

// A small Cycle app describes the side-effects of our component.
const loadDataFromAction = ({action}: Sources) => ({
  http: action.select(handlers.loadData).map(({payload: {username}}) => ({
    url: `https://api.github.com/users/${username}`,
    category: types.loadData,
  }))
});

const loadDataResponse = ({http}: Sources) => ({
  action: http
  .select(types.loadData)
  .flatten()
  .map(({body: {name}}) => actions.setData(name)),
});

const loadDataFromState = ({state}: Sources) => ({
  http: state
    .map(queryLens.get)
    .compose(dropRepeats())
    .map(username => ({
      url: `https://api.github.com/users/${username}`,
      category: types.loadData,
    })),
  action: xs.empty(),
});

const main = combineCycles([
  loadDataFromAction,
  loadDataFromState,
  loadDataResponse,
  debugCycleApp,
]);
export default main;
