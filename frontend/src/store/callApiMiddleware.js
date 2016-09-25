import { callAPI } from '@utils/helpers';
import constants from '@constants';

const { REQUEST, SUCCESS, FAILURE } = constants;

export default function callAPIMiddleware({ dispatch, getState }) {
    return (next) => (action) => {
        const {
            typePrefix,
            api,
            shouldCallAPI = () => true,
            payload = {}
        } = action;

        if (!typePrefix) {
            return next(action);
        }

        if (typeof typePrefix !== 'string') {
            throw new Error('Expected `typePrefix` to be string.');
        }

        if (typeof api.path !== 'string') {
            throw new Error('Expected `api.path` to be a string');
        }

        if (!shouldCallAPI(getState())) {
            return undefined;
        }

        const requestType = `${typePrefix}_${REQUEST}`;
        const successType = `${typePrefix}_${SUCCESS}`;
        const failureType = `${typePrefix}_${FAILURE}`;

        dispatch({ ...payload, type: requestType });

        return callAPI(api).then(
            (data) => dispatch({ ...payload, ...{ payload: data, type: successType } }),
            (error) => dispatch({ ...payload, ...{ payload: error, type: failureType } })
        );
    };
}
