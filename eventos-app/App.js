import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistroScreen from './src/screens/RegistroScreen';
import EventosScreen from './src/screens/EventosScreen';
import UnEventoScreen from './src/screens/UnEventoScreen';
import PerfilScreen from './src/screens/PerfilScreen';  // Pantalla de perfil

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}  // No mostrar header en SplashScreen
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Iniciar Sesión' }}  // Opcional: personalizar el título
        />
        <Stack.Screen
          name="RegistroScreen"
          component={RegistroScreen}
          options={{ title: 'Registro' }}  // Opcional: personalizar el título
        />
        <Stack.Screen
          name="EventosScreen"
          component={EventosScreen}
          options={{ title: 'Eventos' }}  // Opcional: personalizar el título
        />
        <Stack.Screen
          name="UnEventoScreen"
          component={UnEventoScreen}
          options={{ title: 'Detalles del Evento' }}  // Opcional: personalizar el título
        />
        <Stack.Screen
          name="PerfilScreen"
          component={PerfilScreen}
          options={{ title: 'Perfil' }}  // Opcional: personalizar el título
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
