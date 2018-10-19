import {WarpedSources, PayloadTypes} from 'warped-components';
import {AppState} from '../../appState';
import {actions, handlers, types} from './state';
import {AppSources} from '../..';

type Sources = WarpedSources<AppState, PayloadTypes<typeof actions>> & AppSources;

// A small Cycle app describes the side-effects of our component.
export default ({action, http}: Sources) => ({
  http: action
    .select(handlers.loadData)
    .map(({payload: {username}}) => ({
      url: `https://api.github.com/users/${username}`,
      category: types.loadData,
    })),
  action: http
    .select(types.loadData)
    .flatten()
    .map(({body: {name}}) => actions.setData(name)),
});
