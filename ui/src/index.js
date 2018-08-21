import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {App} from './app/app';
import './styles/index.sass';
import Store from './store';

const store = Store();

ReactDOM.render(
    <Provider store={store}>
        <div>
            <App />
        </div>
    </Provider>,
    document.getElementById('app-root')
);
