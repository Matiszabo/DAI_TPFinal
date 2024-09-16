import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../api';

const RegistroScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await api.post('/api/user/register', {
        first_name: firstName,
        last_name: lastName,
        username,
        password,
      });

      if (response.status === 201) {
        navigation.replace('EventosScreen'); 
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Error al registrarse. Inténtalo nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Registrarse" onPress={handleRegister} />
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
  loginText: {
    marginTop: 10,
    color: '#0066cc',
    textAlign: 'center',
  },
});

export default RegistroScreen;
