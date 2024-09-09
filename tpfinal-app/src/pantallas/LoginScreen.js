import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Aquí agregarás la lógica para autenticar al usuario
    // Por ahora, solo vamos a simular una autenticación exitosa

    if (username === 'test' && password === 'password') {
      // Guardar credenciales en AsyncStorage si es exitoso
      await AsyncStorage.setItem('userToken', 'dummyToken');
      navigation.replace('EventosScreen'); // Navegar a la pantalla de eventos
    } else {
      Alert.alert('Error', 'Nombre de usuario o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('RegistroScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
