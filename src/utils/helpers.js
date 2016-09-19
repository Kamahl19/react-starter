import { push } from 'react-router-redux';
import Alert from 'react-s-alert';

/**
 * Redux Helpers
 */
export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        const acc2 = acc;
        acc2[constant] = constant;
        return acc2;
    }, {});
}

export const createReducer = (initialState, reducerMap) =>
    (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return (reducer) ? reducer(state, action.payload) : state;
    };

/**
 * API Communication Helpers
 */
export const checkHttpStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;

    throw error;
};

export const parseJSON = (response) => response.json();

// TODO - rewrite
export const fetchApi = ({ path, method, token, body, dispatch, cb, fb, contentType }) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': contentType || 'application/json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(window.backendUrl + path, {
        method,
        headers,
        body,
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then((response) => {
        dispatch(cb(response.data));
    })
    .catch((error) => {
        const { response } = error;

        if (response) {
            response.json()
            .then((err) => {
                const { message } = err;

                if (message) {
                    Alert.error(message);
                }

                if (response.status === 401) {
                    dispatch({
                        type: 'LOGIN_USER_FAILURE'
                    });

                    dispatch(push('/login'));
                }
                else {
                    dispatch(fb());
                }
            });
        }
        else {
            Alert.error('An unexpected error has occured');

            dispatch(fb());
        }
    });
};
