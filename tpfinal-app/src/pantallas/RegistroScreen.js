import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RegistroScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Aquí agregarás la lógica para registrar al usuario
    // Por ahora, solo vamos a simular un registro exitoso

    if (username && password) {
      Alert.alert('Éxito', 'Usuario registrado exitosamente');
      navigation.replace('LoginScreen'); // Navegar a la pantalla de login después de registro
    } else {
      Alert.alert('Error', 'Por favor, complete todos los campos');
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
      <Button title="Registrarse" onPress={handleRegister} />
      <Button
        title="Iniciar sesión"
        onPress={() => navigation.navigate('LoginScreen')}
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

export default RegistroScreen;
