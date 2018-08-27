import * as React from 'react';
import {createReducer, noopAction} from 'warped-reducers';
import {warped, WarpedPropsOf, WarpedSources} from 'warped-components';
import {HTTPSource} from '@cycle/http';

interface State {
  app: {
    data: string
  },
};

export const selectors = {
  data: (state: State) => state.app.data,
};

// We use warped-reducers to create our reducer and actions.
export const {types, actions, reducer} = createReducer ('App') ({
  loadData: noopAction,
  setData: (name: string) => (state: State) => ({...state, app: {data: name}}),
});

interface Sources extends WarpedSources {
  http: HTTPSource
}
// A small Cycle app describes the side-effects of our component.
export const effects = ({action, http}: Sources) => ({
  http: action.filter (({type}) => type === types.loadData).mapTo ({
    url: 'https://api.github.com/users/Avaq',
    category: types.loadData
  }),
  action: http.select (types.loadData).flatten ().map (({body: {name}}) =>
    actions.setData (name)
  )
});

const warp = warped ({reducer, effects, selectors, actions});

// Functional Component example
export const SFC = warp((props) => {
  // props can be inferred if functional component is defined inline with the partially-applied
  // function call.
  // The alternative is:
  //   const namedSFC = (props: WarpedPropsOf<typeof warp>) => { ... }; export default warp(namedSFC);
  const {data, loadData} = props;
  return (
  <div>
    <h1>{data || 'name unknown'}</h1>
    <button onClick={loadData}>Load!</button>
  </div>
  )
});

// Class component example
// has additional `greeting` required prop
class App extends React.Component<WarpedPropsOf<typeof warp> & {greeting: string}> {
  render() {
    const {data, loadData, greeting} = this.props;
    return (
      <div>
        <h1>{greeting || 'Hello '}{data || 'name unknown'}</h1>
        <button onClick={loadData}>Load!</button>
      </div>
    );
  }
}

export default warp(App);
