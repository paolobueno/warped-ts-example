import * as React from 'react';
import {warped, Warped} from 'warped-components';
import {reducer, actions, itemsLens} from './state';
import GhService from '../GhService';
import {actions as ghActions, usernameLens} from '../GhService/state';

export const selectors = {
  items: itemsLens.get,
  username: usernameLens.get,
};

const warp = warped({
  reducer,
  selectors,
  actions: {
    ...actions,
    ...ghActions,
  },
});

const sfc = (props: Warped<typeof warp> & {greeting: string}) => {
  const {addItem, items, loadUser, username} = props;
  // props can be inferred if functional component is defined inline with the partially-applied
  // function call.
  // The alternative is:
  //   const namedSFC = (props: WarpedPropsOf<typeof warp>) => { ... }; export default warp(namedSFC);
  return (
    <div>
      <h1>{username}</h1>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={() => loadUser({username: 'Avaq'})}>Load!</button>
      <button onClick={() => addItem(-items.length)}>Add!</button>
    </div>
  );
};
sfc.defaultProps = {
  greeting: 'hello',
};

// Functional Component example
export const SFCExample = warp(sfc);

// Class component example
// has additional `greeting` required prop
class App extends React.Component<Warped<typeof warp> & {greeting: string}> {
  render() {
    const {username, greeting, setUser} = this.props;
    return (
      <>
        <GhService />
        <div>
          <h1>
            {greeting}
            {username}
          </h1>
          <button onClick={() => setUser('Avaq')}>Load!</button>
        </div>
      </>
    );
  }
}

export default warp(App);
