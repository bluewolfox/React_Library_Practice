import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { alertSlice } from './reducers/alert';

const reducer = combineReducers({
  alert: alertSlice.reducer,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
