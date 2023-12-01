import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// reducers
import userReducer from './userSlice';
import projectReducer from './projectSlice';
import typeReducer from './typeSelectedSlice';
import popUpOportunityReducer from './popUpOportunity';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userState', 'projectState', 'typeState', 'popUpOportunityState'],
};

const rootReducer = combineReducers({
  userState: userReducer,
  projectState: projectReducer,
  typeState: typeReducer,
  popUpOportunityState: popUpOportunityReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
