import flattenDeep from 'lodash.flattendeep';
import reduce from 'lodash.reduce';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const createActionType = (...parts) => flattenDeep(parts).join('_');

export const createActionCreator = (...type) => payload => ({
  type: createActionType(type),
  payload,
});

export const createApiActionCreators = (...type) => ({
  request: createActionCreator(type, REQUEST),
  success: createActionCreator(type, SUCCESS),
  failure: createActionCreator(type, FAILURE),
});

export const createReducer = (initialState, reducerMap) => {
  const iterator = (reducers, initial = {}, prefix = []) =>
    reduce(
      reducers,
      (acc, reducer, type) =>
        typeof reducer === 'function'
          ? {
              ...acc,
              [createActionType(prefix, type)]: reducer,
            }
          : iterator(reducer, acc, [createActionType(prefix, type)]),
      initial
    );

  const flattened = iterator(reducerMap);

  return (state = initialState, action) => {
    const reducer = flattened[action.type];
    return reducer ? reducer(state, action.payload) : state;
  };
};

export const replaceInArray = (array, selector, value) => {
  const idx = array.findIndex(selector);

  return idx >= 0 ? [...array.slice(0, idx), value, ...array.slice(idx + 1)] : array;
};

export const updateInArray = (array, selector, diff) => {
  const idx = array.findIndex(selector);

  return idx >= 0
    ? [...array.slice(0, idx), { ...array[idx], ...diff }, ...array.slice(idx + 1)]
    : array;
};

export const removeFromArray = (array, selector) => {
  const idx = array.findIndex(selector);

  return idx >= 0 ? [...array.slice(0, idx), ...array.slice(idx + 1)] : array;
};
