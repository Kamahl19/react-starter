import lodash from 'lodash';
import Alert from 'react-s-alert';
import { getTokenFromLS } from '@src/modules/auth/utils/tokenHelpers';

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

    const token = getTokenFromLS();

    if (token) {
        defaultFetchOptions.headers.Authorization = `Bearer ${token}`;
    }

    const mergedOptions = lodash.merge({}, defaultFetchOptions, customOptions);

    if (mergedOptions.body) {
        mergedOptions.body = JSON.stringify(mergedOptions.body);
    }

    // In case of file uploads, its neccessary to delete `Content-Type`
    // so browser sets it implicitly along with `boundary`
    if (mergedOptions.headers['Content-Type'] === '') {
        delete mergedOptions.headers['Content-Type'];
    }

    return mergedOptions;
};

export default function callApi({ path = '/', options }) {
    const throwError = (message = 'An unexpected error has occured') => {
        Alert.error(message);
        throw new Error(message);
    };

    return fetch(process.env.REACT_APP_BACKEND_URL + path, getRequestOptions(options))
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(({ data }) => data)
        .catch(({ response }) => {
            if (!response) {
                return throwError();
            }
            else {
                return response.json()
                    .then(({ message }) => Promise.reject(message))
                    .catch((err) => throwError(err));
            }
        });
};
