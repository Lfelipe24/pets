import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Home } from './src/screens/home';
import { Login } from './src/screens/login';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  return (
    <NavigationContainer>
      {isLogged?
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={Home}/>
          </Stack.Navigator>
        </SafeAreaProvider>
      :
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          </Stack.Navigator>
        </SafeAreaProvider>
      }  
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
