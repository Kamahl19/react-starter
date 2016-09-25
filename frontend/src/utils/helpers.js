import _ from 'lodash';
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
const checkHttpStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;

    throw error;
};

const parseJSON = (response) => response.json();

const getRequestOptions = (customOptions = {}) => {
    const defaultFetchOptions = {
        method: 'get',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };

    const token = localStorage.getItem(window.tokenName);

    if (token) {
        defaultFetchOptions.headers.Authorization = `Bearer ${token}`;
    }

    const result = _.merge({}, defaultFetchOptions, customOptions);

    // In case of file uploads, its neccessary to delete `Content-Type`
    // so browser sets it implicitly along with `boundary`
    if (result.headers['Content-Type'] === '') {
        delete result.headers['Content-Type'];
    }

    return result;
};

export const callAPI = ({ path, options }) => new Promise((resolve, reject) => {
    const rejectWithAlert = (message = 'An unexpected error has occured') => {
        Alert.error(message);
        reject(message);
    };

    fetch(window.backendUrl + path, getRequestOptions(options))
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(({ data }) => {
            resolve(data);
        })
        .catch(({ response }) => {
            if (!response) {
                rejectWithAlert();
            }
            else {
                response.json().then(({ message }) => {
                    rejectWithAlert(message);
                })
                .catch(() => rejectWithAlert());
            }
        });
});
