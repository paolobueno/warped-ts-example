import * as React from 'react';
import {warped, WarpedPropsOf} from 'warped-components';
import effects from './effects';
import {reducer, actions, dataLens, itemsLens} from './state';

export const selectors = {
  data: dataLens.get,
  items: itemsLens.get,
};

const warp = warped({reducer, effects, selectors, actions});

// Functional Component example
export const SFCApp = warp(({data, loadData, addItem, items}) => {
  // props can be inferred if functional component is defined inline with the partially-applied
  // function call.
  // The alternative is:
  //   const namedSFC = (props: WarpedPropsOf<typeof warp>) => { ... }; export default warp(namedSFC);
  return (
    <div>
      <h1>{data}</h1>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={() => loadData({username: 'Avaq'})}>Load!</button>
      <button onClick={() => addItem(-items.length)}>Add!</button>
    </div>
  );
});

// Class component example
// has additional `greeting` required prop
class App extends React.Component<WarpedPropsOf<typeof warp> & {greeting: string}> {
  render() {
    const {data, setData, greeting} = this.props;
    return (
      <div>
        <h1>
          {greeting}
          {data}
        </h1>
        <button onClick={() => setData('Avaq')}>Load!</button>
      </div>
    );
  }
}

export default warp(App);
