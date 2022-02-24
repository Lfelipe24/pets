import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Home } from './src/screens/home';
import { Login } from './src/screens/login';
import { Register } from './src/screens/register';
import { Profile } from './src/screens/profile';
import { Setting } from './src/screens/setting';

import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';
import { useStore } from './src/store/root.store';
import { Ionicons } from '@expo/vector-icons';
import { DARK_GRAY_APP, BLACK_APP } from './src/style/colors';
import * as SplashScreen from 'expo-splash-screen';

import { auth } from './firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const { navigationStore: { loginValue, changeLoginValue }} = useStore('');

  useEffect(() => {
    getAuthStatus();
    prepareApp();
  });

  const getAuthStatus = async () => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        changeLoginValue(true);
      }
    });
  };

  async function prepareApp() {
    try {
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();
      setTimeout(() => setAppIsReady(true), 3000);
    } catch (e) {
      console.warn(e);
    }
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <StatusBar style="dark" />
        {loginValue ?
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <Tab.Navigator
                initialRouteName='Mis mascotas'
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Mis mascotas') {
                      iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Configuración') {
                      iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Perfil') {
                      iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: BLACK_APP,
                  tabBarInactiveTintColor: DARK_GRAY_APP,
                })}>
                <Tab.Screen name='Perfil' component={Profile} options={{ headerShown: false }} />
                <Tab.Screen name='Mis mascotas' component={Home} options={{ headerShown: false }} />
                <Tab.Screen name='Configuración' component={Setting} options={{ headerShown: false }} />
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
    </View>
  );
}


export default observer(App)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
