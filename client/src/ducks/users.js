import { combineReducers } from 'redux';
import { createReducer } from '@src/utils/reduxHelpers';
import { REQUEST, SUCCESS, FAILURE } from '@src/constants/values';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER = 'FETCH_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

/**
 * ACTIONS
 */
export const fetchUsers = () => ({
    typeName: FETCH_USERS,
    api: {
        path: `/users`,
    }
});

export const fetchUser = (userId) => ({
    typeName: FETCH_USER,
    api: {
        path: `/users/${userId}`,
    }
});

export const updateUser = (userId, userData) => ({
    typeName: UPDATE_USER,
    api: {
        path: `/users/${userId}`,
        options: {
            method: 'put',
            body: JSON.stringify(userData),
        }
    }
});

export const deleteUser = (userId) => ({
    typeName: DELETE_USER,
    api: {
        path: `/users/${userId}`,
        options: {
            method: 'delete',
        }
    }
});

/**
 * REDUCERS
 */
const initialState = {
    selectedUser: null,
    users: [],
};

const selectedUser = createReducer(initialState.selectedUser, {
    [FETCH_USER]: {
        [REQUEST]: (state) => state,
        [SUCCESS]: (state, payload) => payload.user,
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
    selectedUser,
    users,
});

/**
 * SELECTORS
 */
export const getUsersState = (state) => state.users;

export const getSelectedUser = (state) => getUsersState(state).selectedUser;

export const getUsers = (state) => getUsersState(state).users;
