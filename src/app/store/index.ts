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
