import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Auth/LoginScreen';
import ForgotScreen from '../screens/Auth/ForgotScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';


const LoginStack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <LoginStack.Screen
        name="Login"
        component={LoginScreen}
      />
      <LoginStack.Screen
        name="Forgot"
        component={ForgotScreen}
      />
      <LoginStack.Screen
        name="SignUp"
        component={SignUpScreen}
      />
    </LoginStack.Navigator>
  );
}