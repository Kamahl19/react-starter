import { callAPI } from '@utils/apiHelpers';
import actionTypes from '@redux/actionTypes';

const { REQUEST, SUCCESS, FAILURE } = actionTypes;

export default function callAPIMiddleware({ dispatch, getState }) {
    return (next) => (action) => {
        const {
            typeName,
            api,
            shouldCallAPI = () => true,
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

        if (!shouldCallAPI(getState())) {
            return undefined;
        }

        const requestType = `${typeName}_${REQUEST}`;
        const successType = `${typeName}_${SUCCESS}`;
        const failureType = `${typeName}_${FAILURE}`;

        dispatch({ ...payload, type: requestType });

        return callAPI(api).then(
            (data) => dispatch({ ...payload, ...{ payload: data, type: successType } }),
            (error) => dispatch({ ...payload, ...{ payload: error, type: failureType } })
        );
    };
}
