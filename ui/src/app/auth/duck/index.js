const REGISTER_REQUEST = '@auth/REGISTER_REQUEST';
const REGISTER_SUCCESS = '@auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = '@auth/REGISTER_FAILURE';

const LOGIN_REQUEST = '@auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = '@auth/LOGIN_FAILURE';

const LOGOUT = '@auth/LOGOUT';

const GETALL_REQUEST = '@auth/GETALL_REQUEST';
const GETALL_SUCCESS = '@auth/GETALL_SUCCESS';
const GETALL_FAILURE = '@auth/GETALL_FAILURE';

const DELETE_REQUEST = '@auth/DELETE_REQUEST';
const DELETE_SUCCESS = '@auth/DELETE_SUCCESS';
const DELETE_FAILURE = '@auth/DELETE_FAILURE';

import {history, hashHistory} from '../../../history';
import {actionCreators as NotificationActions} from '../../notifications/duck';
import {userService} from '../../../_services/UserServices';

function login(username, password) {
    function request(user) { return {type: LOGIN_REQUEST, user} }
    function success(user) { return {type: LOGIN_SUCCESS, user} }
    function failure(error) { return {type: LOGIN_FAILURE, error} }

    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(NotificationActions.doSetError(error.toString()));
                }
            );
    };
}

function logout() {
    userService.logout();
    return { type: LOGOUT };
}

function register(user) {
    function request(user) { return {type: REGISTER_REQUEST, user} }
    function success(user) { return {type: REGISTER_SUCCESS, user} }
    function failure(error) { return {type: REGISTER_FAILURE, error} }

    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(NotificationActions.doSetSuccess('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(NotificationActions.doSetError(error.toString()));
                }
            );
    };
}

function getAll() {
    function request() { return {type: GETALL_REQUEST} }
    function success(users) { return {type: GETALL_SUCCESS, users} }
    function failure(error) { return {type: GETALL_FAILURE, error} }

    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };
}

function deleteUser(id) {
    function request(id) { return {type: DELETE_REQUEST, id} }
    function success(id) { return {type: DELETE_SUCCESS, id} }
    function failure(id, error) { return {type: DELETE_FAILURE, id, error} }

    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };
}


let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    loggingIn: false,
    registering: false,
    loadingUsers: false,
    deletingUser: false,
    loggedIn: false,
    loginError: null,
    registeringError: null,
    deletingUserError: false,
    loadingUsersError: null,
    user: null,
    users: null,
};

if (user) {
    initialState.loggedIn = true,
    initialState.user = user
}

function applyStateDiff(state, diff) {
    return {
        ...state,
        ...diff,
    }
}

export function reducer(state = initialState, action) {
    switch (action.type) {
    case LOGIN_REQUEST:
        return applyStateDiff(state, {loggingIn: true, loginError: null});
    case LOGIN_SUCCESS:
        return applyStateDiff(state, {loggedIn: true, user: action.user});
    case LOGIN_FAILURE:
        return applyStateDiff(state, {loggedIn: false, user: null, loginError: action.loginError});
    case LOGOUT:
        return applyStateDiff(state, {loggedIn: false, user: null});
    case REGISTER_REQUEST:
        return applyStateDiff(state, {registering: true, registeringError: null});
    case REGISTER_SUCCESS:
        return applyStateDiff(state, {registering: false});
    case REGISTER_FAILURE:
        return applyStateDiff(state, {registering: false, registeringError: action.registeringError});

    case GETALL_REQUEST:
        return applyStateDiff(state, {loadingUsers: true, loadingUsersError: null});
    case GETALL_SUCCESS:
        return applyStateDiff(state, {loadingUsers: false, users: action.users});
    case GETALL_FAILURE:
        return applyStateDiff(state, {loadingUsers: false, loadingUsersError: action.loadingUsersError});

    case DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
            ...state,
            deletingUser: true,
            deletingUserError: null,
            users: state.users.map(user =>
            user.id === action.id
                ? { ...user, deleting: true }
                : user
            )
        };
    case DELETE_SUCCESS:
        // remove deleted user from state
        return applyStateDiff(state, {deletingUser: false, users: state.users.filter(user => user.id !== action.id)});
    case DELETE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        return {
            ...state,
            users: state.users.map(user => {
            if (user.id === action.id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deletingUserError: action.error };
            }

            return user;
            })
        };
    default:
        return state;
    }
}


const actionCreators = {
    login,
    logout,
    register,
    getAll,
    deleteUser,
};

const actionTypes = {
    
};

export {
    actionCreators,
    actionTypes,
};

export default reducer;
