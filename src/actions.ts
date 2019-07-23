import { SpinnerActions } from 'packages/spinner/ducks';

import { UserAction } from 'common/services/user';

type RootAction = UserAction | SpinnerActions;

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}
