import { combineReducers } from 'redux';
import { createReducer } from '@src/redux/reduxHelpers';
import actionTypes from '@src/redux/actionTypes';

const {
    REQUEST, SUCCESS, FAILURE,
    //UPDATE_USER,
    DELETE_USER, FETCH_USER, FETCH_USERS,
} = actionTypes;

const initialState = {
    user: null,
    users: [],
};

/**
 * REDUCERS
 */
const user = createReducer(initialState.user, {
    [FETCH_USER]: {
        [REQUEST]: (state) => state,
        [SUCCESS]: (state, { user }) => user,
        [FAILURE]: (state) => null,
    }
});

const removeUser = (users, userToRemove) =>
    users.filter((u) => u.id !== userToRemove.id);

const users = createReducer(initialState.users, {
    [FETCH_USERS]: {
        [REQUEST]: (state) => [],
        [SUCCESS]: (state, payload) => payload.users,
        [FAILURE]: (state) => [],
    },
    [DELETE_USER]: {
        [REQUEST]: (state) => state,
        [SUCCESS]: (state, payload) => removeUser(state, payload.user),
        [FAILURE]: (state) => state,
    },
});

export default combineReducers({
    user,
    users,
});

/**
 * SELECTORS
 */
export const getUserState = (state) => state.user;

export const getUser = (state) => getUserState(state).user;

export const getUsers = (state) => getUserState(state).users;
