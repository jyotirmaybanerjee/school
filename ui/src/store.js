import {applyMiddleware, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createEpicMiddleware} from 'redux-observable';
import {rootEpic} from './indexEpic';
import {reducer} from './indexReducer';

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    reducer,
    compose(
        // composeWithDevTools(applyMiddleware(thunk, applyMiddleware(epicMiddleware)))
        composeWithDevTools(applyMiddleware(thunk))
    )
  );

  // epicMiddleware.run(rootEpic);

  return store;
}
