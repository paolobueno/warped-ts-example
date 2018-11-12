import {createReducer, PayloadsOf} from 'warped-reducers';

interface State {
  myString: string,
  myNumber: number,
}

const {handlers} = createReducer <State>('MyNamespace') ({
  setMyString: (myString: string) => state => Object.assign ({}, state, {myString}),
  setMyNumber: (myNumber: number) => state => Object.assign ({}, state, {myNumber})
});

// type Payloads = string | number
type Payloads = PayloadsOf<typeof handlers>;
