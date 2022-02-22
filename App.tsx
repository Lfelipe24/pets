import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Home } from './src/screens/home';
import { Login } from './src/screens/login';
import { Register } from './src/screens/register';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { useStore } from './src/store/root.store';

function App() {
  const Stack = createNativeStackNavigator();
  const {navigationStore: {loginValue}} = useStore('');
  return (
    <NavigationContainer>
      {loginValue?
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
          </Stack.Navigator>
        </SafeAreaProvider>
      :
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
            <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
          </Stack.Navigator>
        </SafeAreaProvider>
      }  
    </NavigationContainer>
  );
}


export default observer(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
