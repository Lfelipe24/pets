import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Home } from './src/screens/home';
import { Login } from './src/screens/login';
import { Register } from './src/screens/register';
import { Profile } from './src/screens/profile';
import { Setting } from './src/screens/setting';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import { useStore } from './src/store/root.store';
import { Ionicons } from '@expo/vector-icons';

function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const { navigationStore: { loginValue } } = useStore('');
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {loginValue ?
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({}) => {
                  let iconName;

                  if (route.name === 'Home') {
                    iconName = 'home-outline';
                  } else if (route.name === 'Setting') {
                    iconName = 'settings-outline' ;
                  } else if (route.name === 'Profile') {
                    iconName = 'person-outline';
                  }
                  return <Ionicons name={iconName} size={24} color={'black'} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}>
              <Tab.Screen name='Profile' component={Profile} options={{ headerShown: false}} />
              <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
              <Tab.Screen name='Setting' component={Setting} options={{ headerShown: false }} />
            </Tab.Navigator>
          </SafeAreaView>
        </SafeAreaProvider>
        :
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <Stack.Navigator>
              <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
              <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
            </Stack.Navigator>
          </SafeAreaView>
        </SafeAreaProvider>
      }
    </NavigationContainer>
  );
}


export default observer(App)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
