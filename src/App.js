/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RouterNavigation from './navigation/router.navigation';
import { AuthContext } from './context/auth.context';
import { useAuth } from './hooks/auth.hook';

export default function App() {
  const { userId, token, login, logout, ready } = useAuth()
  const isAuthenticated = !!token
  return (
    <AuthContext.Provider value={{ userId, token, isAuthenticated, login, logout, ready }}>
      <NavigationContainer>
        <RouterNavigation />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};