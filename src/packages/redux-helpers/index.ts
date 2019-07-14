// TODO
export const createActionCreator = (type: string) => (payload?: unknown) => ({
  type,
  payload,
});

// TODO
export const createReducer = (initialState: any, handlers: any) => (
  state = initialState,
  action: any
) => {
  const reducer = handlers[action.type];
  return reducer ? reducer(state, action.payload) : state;
};

type Predicate<T> = (elem: T) => boolean;

export const replaceInArray = <T>(array: T[], predicate: Predicate<T>, value: T) => {
  const idx = array.findIndex(predicate);
  return idx >= 0 ? [...array.slice(0, idx), value, ...array.slice(idx + 1)] : array;
};

export const updateInArray = <T>(array: T[], predicate: Predicate<T>, update: (elem: T) => T) => {
  const idx = array.findIndex(predicate);
  return idx >= 0 ? [...array.slice(0, idx), update(array[idx]), ...array.slice(idx + 1)] : array;
};

export const removeFromArray = <T>(array: T[], predicate: Predicate<T>) => {
  const idx = array.findIndex(predicate);
  return idx >= 0 ? [...array.slice(0, idx), ...array.slice(idx + 1)] : array;
};
