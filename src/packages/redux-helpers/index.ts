import deepFreeze from 'deep-freeze';
import flattenDeep from 'lodash.flattendeep';

// TODO

type TODO = any;

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const createActionType = (...parts: TODO) => flattenDeep(parts).join('_');

export const createActionCreator = (...type: TODO) => (payload?: unknown) => ({
  type: createActionType(type),
  payload,
});

export const createApiActionCreators = (...type: TODO) => ({
  request: createActionCreator(type, REQUEST),
  success: createActionCreator(type, SUCCESS),
  failure: createActionCreator(type, FAILURE),
});

export const createInitialState = deepFreeze;

export const createReducer = (initialState: TODO, reducerMap: TODO) => {
  const iterator = (reducersObj: TODO, initial = {}, prefix: TODO[] = []): TODO =>
    Object.entries(reducersObj).reduce(
      (acc, [actionType, reducerFn]) =>
        typeof reducerFn === 'function'
          ? {
              ...acc,
              [createActionType(prefix, actionType)]: reducerFn,
            }
          : iterator(reducerFn, acc, [createActionType(prefix, actionType)]),
      initial
    );

  const flattened: TODO = iterator(reducerMap);

  return (state = initialState, action: TODO) => {
    const reducer = flattened[action.type];
    return reducer ? reducer(state, action.payload) : state;
  };
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
