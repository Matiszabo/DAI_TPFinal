import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../pantallas/SplashScreen';
import LoginScreen from '../pantallas/LoginScreen';
import RegistroScreen from '../pantallas/RegistroScreen';
import EventosScreen from '../pantallas/EventosScreen'; 
import UnEvento from '../pantallas/UnEvento'; 

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegistroScreen"
        component={RegistroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventosScreen"
        component={EventosScreen}
        options={{ title: 'Eventos' }}
      />
      <Stack.Screen
        name="UnEvento"
        component={UnEvento}
        options={{ title: 'Detalles del Evento' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
