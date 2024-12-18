import { configureStore as createStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, createMigrate, PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import counterReducer, { CounterState } from './counterSlice'; // Example slice

// Define migrations
const migrations = {
  0: (state: any) => {
    // Migration for version 0 (initial version)
    return {
      ...state,
    };
  },
  1: (state: any) => {
    // Example migration for version 1 (e.g., renaming a key or resetting a reducer)
    return {
      ...state,
      counter: {
        ...state.counter,
        value: state.counter?.value || 0, // Default value for counter
      },
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
  counter: counterReducer, // Add more slices as needed
});

// Type adjustments for the persisted reducer
type RootReducerState = {
  counter: CounterState;
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
