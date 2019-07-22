import createRootReducer from './rootReducer';

/**
 * Re-export from store
 */
export { store } from './configureStore';
export { default as StorePersistGate } from './StorePersistGate';

/**
 * AppState - type representing root state-tree
 */
export type AppState = ReturnType<ReturnType<typeof createRootReducer>>;
