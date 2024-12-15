import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import * as Keychain from 'react-native-keychain';

function App(): React.JSX.Element {
  const [email, setEmail] = useState('alwingeorge11@gmail.com');
  const [password, setPassword] = useState('password');

  const handleSignUp = async () => {
    try {
      const userCredential:FirebaseAuthTypes.UserCredential = await auth().createUserWithEmailAndPassword(email, password);

      // Extract the required values
      const uid = userCredential.user.uid;
      const userData = userCredential.user.toJSON() as any;
      const refreshToken = userData.refreshToken;


      // Store uuid and refreshToken in the shared Keychain
      await Keychain.setGenericPassword(
        'auth', // A single key for grouping
        JSON.stringify({ uid, refreshToken}), // Store as JSON
        {
          service: '79T4XQDYMY.io.clarifyapp', // Shared keychain identifier
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        },
      );

      Alert.alert('Success', 'User registered and credentials stored securely!');
      console.log('User registered: ', JSON.stringify({ uid, refreshToken }));
    } catch (error: any) {
      let errorMessage = 'Something went wrong. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'This email is invalid.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password must be at least 6 characters long.';
      }
      console.log('Error Details:', error);

      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default App;