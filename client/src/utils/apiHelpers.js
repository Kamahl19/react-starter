import lodash from 'lodash';
import Alert from 'react-s-alert';
import { getToken } from '@src/utils/authHelpers';

const backendUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_BACKEND_URL_PROD : process.env.REACT_APP_BACKEND_URL_DEV;

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

    const token = getToken();

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

export const callAPI = ({ path, options }) =>
    new Promise((resolve, reject) => {
        const rejectWithAlert = (message = 'An unexpected error has occured') => {
            Alert.error(message);
            reject(message);
        };

        fetch(backendUrl + path, getRequestOptions(options))
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
