import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../api';

const EventosScreen = ({ navigation }) => {
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get('/api/event');
        setEventos(response.data);
      } catch (err) {
        setError('Error al cargar eventos.');
      }
    };

    fetchEventos();
  }, []);

  const renderEvento = ({ item }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('UnEventoScreen', { eventId: item.id })}
    >
      <Text style={styles.eventName}>{item.name}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEvento}
      />
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
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
  eventItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EventosScreen;
