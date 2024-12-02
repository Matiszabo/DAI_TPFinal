import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function EventScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          setError('No se encontró el token');
          return;
        }

        const response = await axios.get(' https://fcee-200-73-176-50.ngrok-free.app/api/event', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvents(response.data.events);
      } catch (err) {
        Alert.alert('Error', err.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loginA}>
        <Text style={styles.loginText}>EVENTO</Text>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <FlatList
        data={events}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => {
          // console.log('Evento renderizado:', item); 
          return (
            <View style={styles.eventItem}>
              <Text style={styles.eventText}>Evento número {item.id}</Text>
              <Text style={styles.eventText}>{item.name}</Text>
              <Text style={styles.eventText}>{new Date(item.start_date).toLocaleDateString()}</Text>
              <Button 
                title="Ver detalles" 
                onPress={() => {
                  const eventDate = new Date(item.start_date);
                  const isPastEvent = eventDate < new Date();
                  navigation.navigate(
                    isPastEvent ? 'EventDetailII' : 'EventDetail', 
                    { eventId: item.id }
                  );
                }}
              />
            </View>
          );
        }}
      />
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fondo más claro y neutro
    padding: 16,
  },
  loginA: {
    backgroundColor: '#6c63ff', // Color más intenso para el encabezado
    padding: 20,
    borderRadius: 8, // Bordes redondeados
    marginVertical: 20,
    shadowColor: '#000', // Sombra para realce
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4, // Sombra para Android
  },
  loginText: {
    textAlign: 'center',
    fontSize: 26, // Tamaño de texto aumentado
    fontWeight: 'bold',
    color: '#fff', // Texto blanco para contraste
    letterSpacing: 1.5, // Espaciado entre letras
  },
  errorText: {
    color: '#e63946', // Rojo más vibrante
    marginBottom: 12,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
});
