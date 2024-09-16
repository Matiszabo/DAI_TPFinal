import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAuthToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        // Si hay token, navega a la pantalla de eventos
        navigation.replace('EventosScreen');
      } else {
        // Si no hay token, navega al login
        navigation.replace('LoginScreen');
      }
    };

    setTimeout(checkAuthToken, 2000); // Simular un retardo
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/splash.png')} style={styles.image} />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333333',
  },
});

export default SplashScreen;
