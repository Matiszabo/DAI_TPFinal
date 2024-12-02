import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../utils/api';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('pablo.ulman@ort.edu.ar');
  const [password, setPassword] = useState('pabulm101');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Attempting to log in with:', { username, password });
      const response = await login(username, password);
      console.log('Login response:', response);
      
      if (response.success) {
        // Guardar el token en AsyncStorage
        await AsyncStorage.setItem('userToken', response.token);
        
        // Navegar a la pantalla de eventos
        navigation.navigate('Events');
      } else {
        setError(response.message);
        console.log('Error message from response:', response.message);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.log('Error caught in catch block:', err);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.loginA}>
        <Text style={styles.loginText}>LOGIN</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://lh7-rt.googleusercontent.com/docsz/AD_4nXcPcAkWPu8rDqhKRt7fZOP6_HGT9NC9WlH8IHW2c4UcqaRT_VabF_GB-kghum9Sxvl7OgkxU56en42J5FD1_u0TySf_loPeEGZWp-KszLbtR5v5KtuhfLokHFFy_QZGxJz38WRuMHXJPcxBpmujVg?key=VKJaD4CUpFDLTPgfGROqhA' }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Aumento el padding para darle más espacio a los elementos
    backgroundColor: '#f7f7f7', // Cambié el fondo a un gris claro
  },
  loginA: {
    backgroundColor: '#6c63ff', // Mantengo el fondo morado pero un poco más suave
    padding: 20,
    marginTop: 40,
    borderRadius: 10, // Bordes redondeados
    shadowColor: '#000', // Sombra sutil para darle profundidad
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  loginText: {
    textAlign: "center",
    fontSize: 26, // Aumento un poco el tamaño del texto
    fontWeight: 'bold',
    color: '#ffff' // Color actualizado
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20, // Le agregué un poco de espacio encima
  },
  image: {
    width: '80%', // Reducido al 80% del ancho del contenedor
    height: 'auto',
    aspectRatio: 1.5,
    borderRadius: 10, // Bordes redondeados en la imagen
    marginBottom: 20, // Espacio debajo de la imagen
  },
  input: {
    height: 45, // Aumento un poco la altura de los inputs
    borderColor: '#ddd', // Cambio el color del borde a un gris más suave
    borderWidth: 1,
    borderRadius: 8, // Bordes redondeados en los inputs
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff', // Fondo blanco para los inputs
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    fontSize: 14, // Aumento el tamaño del texto de error para que sea más visible
  },
});
