import { configureStore as createStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, createMigrate, PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appSettingsReducer, { AppSettingsState } from './appSettingsSlice';

// Define migrations
const migrations = {
  0: (state: any) => {
    // Migration for version 0 (initial version)
    return {
      ...state,
    };
  },

};

// Persist Config with versioning
const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
  version: 1, // Current migration version
  migrate: createMigrate(migrations, { debug: false }),
};

// Combine Reducers
const rootReducer = combineReducers({
  appSettings: appSettingsReducer,
});

// Type adjustments for the persisted reducer
type RootReducerState = {
  appSettings: AppSettingsState;
};

// Persisted Reducer
const persistedReducer = persistReducer<RootReducerState>(persistConfig, rootReducer);

// Configure Store
export const store = createStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Redux Persist
    }),
});

// Persistor
export const persistor = persistStore(store);

// RootState and AppDispatch Types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
