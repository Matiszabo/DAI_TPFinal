import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

const PerfilScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const response = await api.get('/api/user/me', { headers: { Authorization: `Bearer ${token}` } });
        setUser(response.data);
      } catch (err) {
        setError('Error al cargar el perfil del usuario.');
      }
    };

    getUserDetails();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken'); 
    navigation.replace('LoginScreen'); 
  };

  if (!user) {
    return <Text>Cargando perfil...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.info}>Nombre: {user.first_name} {user.last_name}</Text>
      <Text style={styles.info}>Correo: {user.username}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Cerrar sesión" onPress={handleLogout} />
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
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
});

export default PerfilScreen;
