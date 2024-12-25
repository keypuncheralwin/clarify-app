import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'; // Correct import for native stack
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { useTheme } from 'react-native-paper';

export type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = (): React.JSX.Element => {
  const { colors } = useTheme();

  // Define stack screen options with theme colors
  const stackScreenOptions: NativeStackNavigationOptions = {
    headerBackVisible: true,
    headerBackButtonDisplayMode: 'minimal',
    headerTintColor: colors.primary,
    headerStyle: {
      backgroundColor: colors.background,
    },
  };

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
