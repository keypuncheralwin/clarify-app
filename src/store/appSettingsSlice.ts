import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppSettingsState {
  isFreshInstall: boolean;
  isDarkMode: boolean;
}

const initialState: AppSettingsState = {
  isFreshInstall: true,
  isDarkMode: true,
};

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    setFreshInstall: (state, action: PayloadAction<boolean>) => {
      state.isFreshInstall = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

// Export actions and reducer
export const { setFreshInstall, toggleDarkMode, setDarkMode } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
