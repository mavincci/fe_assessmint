// src/store.js or src/redux/store.js

import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { devToolsEnhancer } from '@redux-devtools/extension';
import rootReducer from './reducers'; // Make sure this file exists and exports combineReducers(...)

const middleware = [thunk];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    devToolsEnhancer({ trace: true })
  )
);

export default store;
