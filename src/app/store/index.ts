import createRootReducer from './rootReducer';

export { store } from './configureStore';
export { history } from './configureStore';
export { default as StorePersistGate } from './StorePersistGate';

export type AppState = ReturnType<ReturnType<typeof createRootReducer>>;
