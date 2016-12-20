import lodash from 'lodash';
import Alert from 'react-s-alert';
import { getTokenFromLocalStorage } from '@src/utils/auth/authHelpers';

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

    const token = getTokenFromLocalStorage();

    if (token) {
        defaultFetchOptions.headers.Authorization = `Bearer ${token}`;
    }

    const result = lodash.merge({}, defaultFetchOptions, customOptions);

    // In case of file uploads, its neccessary to delete `Content-Type`
    // so browser sets it implicitly along with `boundary`
    if (result.headers['Content-Type'] === '') {
        delete result.headers['Content-Type'];
    }

    return result;
};

export default function callApi({ path, options }) {
    const rejectWithAlert = (message = 'An unexpected error has occured') => {
        Alert.error(message);
        return Promise.reject(message);
    };

    return fetch(process.env.REACT_APP_BACKEND_URL + path, getRequestOptions(options))
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(({ data }) => data)
        .catch(({ response }) => {
            if (!response) {
                return rejectWithAlert();
            }
            else {
                return response.json()
                    .then(({ message }) => rejectWithAlert(message))
                    .catch(() => rejectWithAlert());
            }
        });
};
