import callApi from '@src/utils/api/callApi';
import { REQUEST, SUCCESS, FAILURE } from '@src/constants/values';

export default function callApiMiddleware({ dispatch, getState }) {
    return (next) => (action) => {
        const {
            typeName,
            api,
            shouldCallApi = () => true,
            payload = {}
        } = action;

        if (!typeName) {
            return next(action);
        }

        if (typeof typeName !== 'string') {
            throw new Error('Expected `typeName` to be string.');
        }

        if (typeof api.path !== 'string') {
            throw new Error('Expected `api.path` to be a string');
        }

        if (!shouldCallApi(getState())) {
            return undefined;
        }

        const requestType = `${typeName}_${REQUEST}`;
        const successType = `${typeName}_${SUCCESS}`;
        const failureType = `${typeName}_${FAILURE}`;

        dispatch({ ...payload, type: requestType });

        return callApi(api)
            .then((data) => dispatch({ ...payload, ...{ payload: data, type: successType } }))
            .catch((error) => dispatch({ ...payload, ...{ payload: error, type: failureType } }));
    };
}
