import { createReducer } from '@src/redux/reduxHelpers';
import actionTypes from '@src/redux/actionTypes';

const {
    REQUEST, SUCCESS, FAILURE,
    UPDATE_USER, DELETE_USER, FETCH_USER, FETCH_USERS,
} = actionTypes;

const initialState = {
    user: null,
    users: [],
};

const user = createReducer(initialState.user, {
    [FETCH_USER]: {
        [REQUEST]: (state) => state,
        [SUCCESS]: (state, { user }) => user,
        [FAILURE]: (state) => null,
    }
})

const removeUser = (users, user) => {
    const userId = state.users.map((u) => u.id).indexOf(user.id);
    
    return [
        ...users.slice(0, userId),
        ...users.slice(userId + 1),
    ]
}

const users = createReducer(initialState.users, {
    [FETCH_USERS]: {
        [REQUEST]: (state) => [],
        [SUCCESS]: (state, { users }) => users,
        [FAILURE]: (state) => [],
    },
    [DELETE_USER]: {
        [REQUEST]: (state) => state,
        [SUCCESS]: (state, { user }) => removeUser(state, user),
        [FAILURE]: (state) => state,
    },
})

export default combineReducers({
    user,
    users,
})
