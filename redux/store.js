import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// reducers
import userReducer from './userSlice';
import projectReducer from './projectSlice';
import typeReducer from './typeSelectedSlice';
import unitReducer from './unitSelectedSlice';
import popUpOportunityReducer from './popUpOportunity';
import contactSelectedReducer from './contactSelectedSlice';
import opportunitySelectedReducer from './opportunitySelectedSlice';
import editObjectReducer from './editObjectSlice';
import zoomImgReducer from './zoomImg';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'userState',
    'projectState',
    'typeState',
    'popUpOportunityState',
    'unitState',
    'contactOpportunityState',
    'opportunityState',
    'editObjectState',
    'zoomImgState',
  ],
};

const rootReducer = combineReducers({
  userState: userReducer,
  projectState: projectReducer,
  typeState: typeReducer,
  unitState: unitReducer,
  opportunityState: opportunitySelectedReducer,
  contactOpportunityState: contactSelectedReducer,
  popUpOportunityState: popUpOportunityReducer,
  editObjectState: editObjectReducer,
  zoomImgState: zoomImgReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
