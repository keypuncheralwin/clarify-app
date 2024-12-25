import React, { useRef, useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme, Text, Button } from 'react-native-paper';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { RootStackParamList } from '../navigation/RootStack';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { colors } = useTheme();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points (v5 syntax)
  const snapPoints = useMemo(() => [ '25%', '50%', '90%' ], []);

  // Handlers for Bottom Sheet
  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Details Screen</Text>
      <Text style={[styles.text, { color: colors.primary }]}>Item ID: {itemId}</Text>

      <Button
        mode="contained"
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        Go Back
      </Button>

      <Button
        mode="outlined"
        onPress={handleOpenBottomSheet}
        style={styles.button}
      >
        Show Bottom Sheet
      </Button>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // Start hidden
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backgroundStyle={styles.bottomSheetBackground}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetText}>This is a Bottom Sheet!</Text>
          <Button mode="contained" onPress={handleCloseBottomSheet}>
            Close Bottom Sheet
          </Button>
        </BottomSheetView>
      </BottomSheet>
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
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: '80%',
  },
  bottomSheetBackground: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  bottomSheetText: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default DetailsScreen;
