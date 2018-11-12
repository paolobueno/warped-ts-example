import {WarpedSources, combineCycles} from 'warped-components';
import {AppState} from '../../appState';
import {handlers} from './state';
import {AppSources} from '../..';
import xs from 'xstream';
import {PayloadsOf} from 'warped-reducers';

type Sources = WarpedSources<AppState, PayloadsOf<typeof handlers>> & AppSources;
const debugCycleApp = ({action}: Sources) => ({
  http: xs.empty(),
  action: action
    .all()
    .debug()
    .filter(_ => false),
});

// A small Cycle app describes the side-effects of our component.
const getUser = ({action}: Sources) => ({
  http: action.select(handlers.loadUser).map(({payload: {username}}) => ({
    url: `https://api.github.com/users/${username}`,
    category: handlers.loadUser.type,
  }))
});

const getUserResponse = ({http}: Sources) => ({
  action: http
  .select(handlers.loadUser.type)
  .flatten()
  .map(({body: {name}}) => handlers.setUser.action(name)),
});

const main = combineCycles([
  getUser,
  getUserResponse,
  debugCycleApp,
]);
export default main;
