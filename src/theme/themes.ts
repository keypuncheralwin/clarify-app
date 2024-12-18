import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#121212',
    accent: '#03dac4',
    background: '#ffffff',
    surface: '#ffffff',
    onBackground: '#000000',
    onSurface: '#000000',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',
    accent: '#03dac6',
    background: '#121212',
    surface: '#121212',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
  },
};
