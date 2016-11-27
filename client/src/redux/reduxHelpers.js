import _ from 'lodash';

export const createConstants = (...constants) =>
    constants.reduce((acc, constant) => {
        const acc2 = acc;
        acc2[constant] = constant;
        return acc2;
    }, {});

export const createReducer = (initialState, reducerMap) => {
    const makeType = (prefix, type) => prefix.concat(type).join('_');

    const iterator = (reducers, initial = {}, prefix = []) =>
        _.reduce(reducers, (acc, reducer, type) => {
            if (_.isFunction(reducer)) {
                return { ...acc, [makeType(prefix, type)]: reducer };
            }
            return iterator(reducer, acc, [makeType(prefix, type)]);
        }, initial);

    const flattened = iterator(reducerMap);

    return (state = initialState, action) => {
        const reducer = flattened[action.type];
        return (reducer) ? reducer(state, action.payload) : state;
    };
};
