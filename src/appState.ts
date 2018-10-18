import {Lens} from 'monocle-ts';
import {AppComponentState} from './components/App/state';

export interface AppState {
  app: AppComponentState;
}

export const baseStateFor = Lens.fromProp<AppState>();
