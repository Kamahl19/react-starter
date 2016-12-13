import { createReducer } from '@src/redux/reduxHelpers';
import actionTypes from '@src/redux/actionTypes';

const {
    REQUEST, SUCCESS, FAILURE,
    UPDATE_USER, DELETE_USER, FETCH_USER, FETCH_USERS,
} = actionTypes;

const initialState = {
    users: [],
    user: null,
};

export default createReducer(initialState, {

    [DELETE_USER]: {
        [REQUEST]: (state) => ({
            ...state,
        }),
        [SUCCESS]: (state, { user }) => {
            const userIdx = state.users.map((u) => u.id).indexOf(user.id);

            return {
                ...state,
                ...{
                    users: [
                        ...state.users.slice(0, userIdx),
                        ...state.users.slice(userIdx + 1),
                    ],
                }
            };
        },
        [FAILURE]: (state) => ({
            ...state,
        }),
    },

    [FETCH_USER]: {
        [REQUEST]: (state) => ({
            ...state,
            ...{
                user: null,
            }
        }),
        [SUCCESS]: (state, { user }) => ({
            ...state,
            ...{
                user,
            }
        }),
        [FAILURE]: (state) => ({
            ...state,
            ...{
                user: null,
            }
        }),
    },

    [FETCH_USERS]: {
        [REQUEST]: (state) => ({
            ...state,
            ...{
                users: [],
            }
        }),
        [SUCCESS]: (state, { users }) => ({
            ...state,
            ...{
                users,
            }
        }),
        [FAILURE]: (state) => ({
            ...state,
            ...{
                users: [],
            }
        }),
    },

});
