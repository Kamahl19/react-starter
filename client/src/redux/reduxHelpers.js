import { flattenDeep, reduce, isFunction } from 'lodash';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const createActionType = (...parts) => flattenDeep(parts).join('_');

export const createActionCreator = (...type) => (payload) => ({
    type: createActionType(type),
    payload,
});

export const createActionCreators = (...type) => ({
    request: createActionCreator(type, REQUEST),
    success: createActionCreator(type, SUCCESS),
    failure: createActionCreator(type, FAILURE),
});

export const createReducer = (initialState, reducerMap) => {
    const iterator = (reducers, initial = {}, prefix = []) =>
        reduce(reducers, (acc, reducer, type) => {
            if (isFunction(reducer)) {
                return { ...acc, [createActionType(prefix, type)]: reducer };
            }
            return iterator(reducer, acc, [createActionType(prefix, type)]);
        }, initial);

    const flattened = iterator(reducerMap);

    return (state = initialState, action) => {
        const reducer = flattened[action.type];
        return (reducer) ? reducer(state, action.payload) : state;
    };
};
