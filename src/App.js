/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { AuthContext } from './context/auth.context';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from './hooks/auth.hook';
import RouterNavigation from './navigation/router.navigation';

export default function App() {
  const { userId, token } = useAuth()
  const isAuthenticated = !!token
  return (
    <AuthContext.Provider value={{ userId, isAuthenticated }}>
      <NavigationContainer>
        <RouterNavigation />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};