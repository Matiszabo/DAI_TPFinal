import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://ant-clear-secretly.ngrok-free.app', 
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken'); 

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;