/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { DataContext } from './context/data.context';
import CommonNavigation from './navigation/common.navigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  return (
    <DataContext.Provider value={null}>
      <NavigationContainer>
        <CommonNavigation />
      </NavigationContainer>
    </DataContext.Provider>
  );
};