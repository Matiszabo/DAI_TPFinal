import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function ProfileScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    setError('No se encontró el token de autenticación.');
                    return;
                }

                const response = await axios.get(
                    ' https://fcee-200-73-176-50.ngrok-free.app/api/user/profile',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.success) {
                    setUser(response.data.user);
                } else {
                    setError(response.data.message || 'No se pudo cargar la información del usuario.');
                }
            } catch (err) {
                setError('Error al cargar el perfil del usuario.');
                console.error(err);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <View style={styles.loginA}>
                        <Text style={styles.loginText}>PROFILE</Text>
                    </View>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.info}>{user.first_name}</Text>
                    <Text style={styles.label}>Apellido:</Text>
                    <Text style={styles.info}>{user.last_name}</Text>
                    <Text style={styles.label}>Correo electrónico:</Text>
                    <Text style={styles.info}>{user.username}</Text>
                </>
            ) : (
                <Text style={styles.error}>{error || 'Cargando perfil...'}</Text>
            )}
            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Fondo claro y neutro
        padding: 16,
    },
    loginA: {
        backgroundColor: '#6c63ff', // Fondo vibrante para la cabecera
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
        fontSize: 26, // Tamaño del texto aumentado
        fontWeight: 'bold',
        color: '#fff', // Texto blanco para contraste
        letterSpacing: 1.5, // Espaciado entre letras
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333', // Gris oscuro para legibilidad
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
        color: '#6c63ff', // Color del texto similar al encabezado
    },
    info: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555', // Gris medio para contraste suave
        padding: 8,
        backgroundColor: '#fff', // Fondo blanco para destacar
        borderRadius: 6, // Bordes redondeados
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2, // Sombra para Android
    },
    error: {
        color: '#e63946', // Rojo vivo para errores
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 20,
    },
});