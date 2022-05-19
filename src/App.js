import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RouterNavigation from './navigation/router.navigation';
import { AuthContext } from './context/auth.context';

import NetInfo from "@react-native-community/netinfo";
import { useAuth } from './hooks/auth.hook';

export default function App() {
  const { userId, userData, deviceId, token, login, logout, ready } = useAuth()
  const [connected, setConnected] = useState(true)
  // const [userData, setUserData] = useState(null)
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
  const context = {
    userId,
    token,
    userData,
    deviceId,
    isAuthenticated,
    login,
    logout,
    ready,
    connected,
    setConnected,
    refreshConnection
  }
  return (
    <AuthContext.Provider value={context}>
      <NavigationContainer>
        <RouterNavigation />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};