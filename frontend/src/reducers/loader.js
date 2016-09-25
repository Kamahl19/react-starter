import { REQUEST, SUCCESS, FAILURE } from '@constants';

const initialState = {
    unfinishedRequests: [],
};

export default (state = initialState, action) => {
    const requestStart = action.type.includes(REQUEST);
    const requestFinish = action.type.includes(SUCCESS) || action.type.includes(FAILURE);

    const reducer = () => {
        const unfinishedRequests = state.unfinishedRequests.concat();

        if (requestStart) {
            unfinishedRequests.push(action.type);
        }
        else if (requestFinish) {
            const type = action.type.replace(SUCCESS, REQUEST).replace(FAILURE, REQUEST);
            unfinishedRequests.splice(unfinishedRequests.indexOf(type), 1);
        }

        return {
            ...state,
            ...{
                unfinishedRequests,
            }
        };
    };

    return reducer(state, action.payload);
};
