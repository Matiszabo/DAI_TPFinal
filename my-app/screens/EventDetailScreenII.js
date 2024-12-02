import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function EventDetailScreenII({ route }) {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEventDetail();
    fetchParticipants();
  }, [eventId]);

  const fetchEventDetail = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        setError("No se encontró el token");
        return;
      }

      const response = await axios.get(
        `https://fcee-200-73-176-50.ngrok-free.app/api/event/${eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data) {
        setEvent(response.data);
      }
    } catch (err) {
      setError(`Error al obtener detalles del evento: ${err.message}`);
    }
  };

  const fetchParticipants = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `https://fcee-200-73-176-50.ngrok-free.app/api/event/${eventId}/enrollment`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setParticipants(response.data.collection || []);
    } catch (err) {
      console.error("Error al obtener los participantes:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DETALLES DEL EVENTO</Text>
      </View>
      {event ? (
        <ScrollView>
          <Text style={styles.eventTitle}>{event.name}</Text>
          <Text style={styles.detailText}>
            Fecha: {new Date(event.start_date).toLocaleDateString()}
          </Text>
          <Text style={styles.detailText}>{event.description}</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.subDetailText}>
              Categoría: {event?.event_category?.name || "Sin categoría"}
            </Text>
            <Text style={styles.subDetailText}>
              Ubicación: {event?.event_location?.name || "Sin ubicación"} -{" "}
              {event?.event_location?.full_address || ""}
            </Text>
            <Text style={styles.subDetailText}>
              Duración: {event.duration_in_minutes} minutos
            </Text>
            <Text style={styles.subDetailText}>Precio: ${event.price}</Text>
            <Text style={styles.subDetailText}>
              Capacidad: {event.max_assistance}
            </Text>
          </View>

          <Text style={styles.separator}>-------------------------------------------------------</Text>

          <Text style={styles.sectionTitle}> Inscriptos</Text>
          <View style={styles.participantList}>
            {participants.map((participant, index) => (
              <View key={index} style={styles.participantItem}>
                <Text style={styles.participantName}>
                  {participant.user.first_name} {participant.user.last_name}
                </Text>
                <View
                  style={[
                    styles.attendanceStatus,
                    {
                      backgroundColor:
                        participant.attended === "1" ? "#4CAF50" : "#F44336"
                    }
                  ]}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.loadingText}>Cargando detalles del evento...</Text>
      )}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  header: {
    backgroundColor: "#cfc0fe",
    padding: 16,
    marginTop: 40,
    borderRadius: 8
  },
  headerText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#6c63ff" // Color actualizado
  },
  detailText: {
    fontSize: 18,
    marginTop: 10,
    color: "#555"
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 10
  },
  subDetailText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8
  },
  separator: {
    marginTop: 30,
    textAlign: "center",
    color: "#bbb"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#4236cf"
  },
  participantList: {
    marginTop: 10
  },
  participantItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  participantName: {
    fontSize: 16,
    marginRight: 10,
    color: "#333"
  },
  attendanceStatus: {
    width: 12,
    height: 12,
    borderRadius: 6
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#888"
  }
});
