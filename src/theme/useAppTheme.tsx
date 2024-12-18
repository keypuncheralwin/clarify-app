import React from 'react';
import { useSelector } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { lightTheme, darkTheme } from './themes';
import { RootState } from '../store/configureStore';

// Hook to determine the current theme
export const useAppTheme = () => {
  const isDarkMode = useSelector((state: RootState) => state.appSettings.isDarkMode);
  return isDarkMode ? darkTheme : lightTheme;
};

// ThemeProvider with StatusBar
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDarkMode = useSelector((state: RootState) => state.appSettings.isDarkMode);
  const theme = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      {/* StatusBar */}
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      {children}
    </PaperProvider>
  );
};
