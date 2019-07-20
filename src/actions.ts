import { UserAction } from './common/services/user';
import { SpinnerActions } from './packages/spinner/ducks';

type RootAction = UserAction | SpinnerActions;

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}
