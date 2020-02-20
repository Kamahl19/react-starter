import { RouterAction } from 'connected-react-router';

import { AuthServiceAction } from 'common/services/auth';
import { AuthAction } from 'features/auth/ducks';

import createRootReducer from './rootReducer';

/**
 * Re-export from store
 */
export { store } from './configureStore';
export { default as StorePersistGate } from './StorePersistGate';

/**
 * RootState - type representing root state-tree
 */
export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

/**
 * RootAction - type representing union type of all action objects
 */
type RootAction = RouterAction | AuthServiceAction | AuthAction;

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}
