import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '@/redux/auth'
import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from './modal';
import taskListReducer from './taskList';
const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  taskList: taskListReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
  
})

export const persistor = persistStore(store)