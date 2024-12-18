import React from 'react';
import Providers from './Providers';
import AppNavigator from '../navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <Providers>
      <AppNavigator />
    </Providers>
  );
}

export default App;
