/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar} from 'react-native';
import Routes from './routes';
import {NavigationContainer} from '@react-navigation/native';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#228B22" />
      <AppProvider>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
