import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStack';
import { RootState } from '../store/configureStore';
import { toggleDarkMode } from '../store/appSettingsSlice';
import CustomSwitch from '../theme/components';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.appSettings.isDarkMode);
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>
        Welcome to the Home Screen!
      </Text>

      {/* Dark Mode Toggle */}
      <View style={styles.switchContainer}>
        <Text style={[styles.label, { color: colors.primary }]}>Dark Mode</Text>
        <CustomSwitch
          value={isDarkMode}
          onValueChange={() => {
            dispatch(toggleDarkMode());
            return;
          }}
        />
      </View>

      {/* Navigation Button */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Details', { itemId: 42 })}
        style={styles.button}
      >
        Go to Details
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginRight: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default HomeScreen;
