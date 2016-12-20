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
    return new Promise((resolve, reject) => {
        const rejectWithError = (message = 'An unexpected error has occured') => {
            Alert.error(message);
            reject(message);
        };

        fetch(process.env.REACT_APP_BACKEND_URL + path, getRequestOptions(options))
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(({ data }) => {
                resolve(data);
            })
            .catch(({ response }) => {
                if (!response) {
                    rejectWithError();
                }
                else {
                    response.json()
                        .then(({ message }) => rejectWithError(message))
                        .catch(() => rejectWithError());
                }
            });
    });
};
