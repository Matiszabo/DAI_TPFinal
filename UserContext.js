import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Estado global del usuario

  const login = async (username, password) => {
    try {
      const response = await fetch('https://pleased-vocal-corgi.ngrok-free.app/api/user/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.ok) {
        setUser(result); 
        return true;
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const register = async (first_name,last_name,username, password) => {
    console.log("a")
    try {
      const response = await fetch('https://pleased-vocal-corgi.ngrok-free.app/api/user/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name,last_name,username, password }),
      });
      const result = await response.json();
      if (response.ok) {
        await login(username,password)
        return true;
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setUser(null); // Limpia el estado del usuario
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}