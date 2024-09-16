import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UnEventoScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/event/${eventId}`);
        setEvent(response.data);
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const checkSubscription = await api.get(`/api/event/${eventId}/enrollment`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsSubscribed(checkSubscription.data.subscribed);
        }
      } catch (err) {
        setError('Error al cargar el evento.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubscription = async (subscribe) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        setError('Debes iniciar sesión para suscribirte.');
        return;
      }
      const response = await api.post(
        `/api/event/${eventId}/enrollment/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSubscribed(subscribe);
      setError(subscribe ? 'Suscripción exitosa.' : 'Desuscripción exitosa.');
    } catch (err) {
      setError(subscribe ? 'Error al suscribirse.' : 'Error al desuscribirse.');
    }
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {event && (
        <>
          <Text style={styles.title}>{event.name}</Text>
          <Text>{event.description}</Text>
          {event.date > new Date() && (
            <Button
              title={isSubscribed ? 'Desuscribirse' : 'Suscribirse'}
              onPress={() => handleSubscription(!isSubscribed)}
            />
          )}
          {/* Aquí podrías mostrar los detalles de los participantes si el evento ya ocurrió */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UnEventoScreen;
