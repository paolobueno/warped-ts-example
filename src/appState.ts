import {Lens} from 'monocle-ts';
import {AppComponentState} from './components/App/state';
import {GhServiceState} from './components/GhService/state';

export interface AppState {
  app: AppComponentState;
  gh: GhServiceState;
}

export const baseStateFor = Lens.fromProp<AppState>();
