const initialState = {
    unfinishedRequests: [],
};

export default (state = initialState, action) => {
    const requestStart = action.type.includes('_REQUEST');
    const requestFinish = action.type.includes('_SUCCESS') || action.type.includes('_FAILURE');

    const reducer = () => {
        const unfinishedRequests = state.unfinishedRequests.concat();

        if (requestStart) {
            unfinishedRequests.push(action.type);
        }
        else if (requestFinish) {
            const type = action.type.replace('_SUCCESS', '_REQUEST').replace('_FAILURE', '_REQUEST');
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
