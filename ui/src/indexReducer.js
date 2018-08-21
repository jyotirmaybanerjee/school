import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import auth from './app/Auth/duck';
import notifications from './app/notifications/duck';

export const reducer = combineReducers({
    form: formReducer,
    routing: routerReducer,
    auth,
    notifications,
});
