// @flow

const SET = '@@notifications/SET';
const CLEAR = '@@notifications/CLEAR';

function doSetSuccess(message: String) {
    return {type: SET, notification: {message, type: 'success'}};
}

function doSetError(message: String) {
    return {type: SET, notification: {message, type: 'error'}};
}

function doSetClear() {
    return {type: CLEAR};
}

function applySetNotification(state, action): Object {
    const notifications = [
        ...state.notifications,
        action.notification
    ];
    return {...state, notifications};
}

function applyClearNotification(state, action): Object {
    const notifications = [];
    return {...state, notifications};
}

const initialState = {
    notifications: []
};

function reducer(state: NotificationState = initialState, action: Object): ?NotificationState {
    switch (action.type) {
    case SET:
        return applySetNotification(state, action);
    case CLEAR:
        return applyClearNotification(state, action);
    default:
        return state;
    }
}

const actionCreators = {
    doSetSuccess,
    doSetError,
    doSetClear,
};

const actionTypes = {
    SET,
    CLEAR,
};

export {
    actionCreators,
    actionTypes,
};

export default reducer;