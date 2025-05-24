// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import combineReducers from "./reducers"; // your combined reducers

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers);

export const Store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(Store);
