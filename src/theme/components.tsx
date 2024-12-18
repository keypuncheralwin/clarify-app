import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Pressable, Animated } from 'react-native';
import { Switch, useTheme } from 'react-native-paper';

type CustomSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  color?: string;
};

const CustomSwitch: React.FC<CustomSwitchProps> = ({ value, onValueChange, color }) => {
  const { colors } = useTheme();

  const defaultColor = color || colors.primary;

  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const thumbPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 20],
  });

  const getSwitchStyles = () => ({
    container: {
      ...styles.switchContainer,
      backgroundColor: value ? defaultColor : '#ddd',
    },
    thumb: {
      ...styles.thumb,
      transform: [{ translateX: thumbPosition }],
    },
  });

  const switchStyles = getSwitchStyles();

  if (Platform.OS === 'ios') {
    return <Switch value={value} onValueChange={onValueChange} color={defaultColor} />;
  }

  return (
    <Pressable onPress={() => onValueChange(!value)} style={switchStyles.container}>
      <Animated.View style={switchStyles.thumb} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 48,
    height: 28,
    borderRadius: 14, // Round edges
    justifyContent: 'center',
    paddingHorizontal: 1, // Small internal padding
  },
  thumb: {
    width: 24, // Thumb size
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3, // Shadow for Android
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
});

export default CustomSwitch;
