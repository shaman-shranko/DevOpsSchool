/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RouterNavigation from './navigation/router.navigation';
import { AuthContext } from './context/auth.context';

import NetInfo from "@react-native-community/netinfo";
import { useAuth } from './hooks/auth.hook';

export default function App() {
  const { userId, token, userData, login, logout, ready } = useAuth()
  const [connected, setConnected] = useState(true)
  const isAuthenticated = !!token

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setConnected(!offline)
    });

    return () => removeNetInfoSubscription();
  }, [connected]);

  const refreshConnection = () => {
    NetInfo.refresh().then(state => {
      setConnected(state.isConnected);
    });
  }

  return (
    <AuthContext.Provider value={{ userId, token, userData, isAuthenticated, login, logout, ready, connected, setConnected, refreshConnection }}>
      <NavigationContainer>
        <RouterNavigation />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};