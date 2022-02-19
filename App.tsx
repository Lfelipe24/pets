import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Home } from './src/screens/home';
import { Login } from './src/screens/login';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  return (
    <NavigationContainer>
      {isLogged?
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
      :
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login}/>
        </Stack.Navigator>
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
