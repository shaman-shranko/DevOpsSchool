import React from 'react';
import StudyScreen from '../screens/StudyScreen';
import CourseScreen from '../screens/CourseScreen';
import CabinetScreen from '../screens/CabinetScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default CommonNavigation = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Study') {
          iconName = focused
            ? 'school'
            : 'school-outline';
        } else if (route.name === 'Course') {
          iconName = focused
            ? 'cart'
            : 'cart-outline';
        } else if (route.name === 'Cabinet') {
          iconName = focused
            ? 'person-circle'
            : 'person-circle-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabelStyle: {
        fontSize: 14,
      },
      tabBarActiveTintColor: '#6786DA',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen name="Study" component={StudyScreen} />
    <Tab.Screen name="Course" component={CourseScreen} />
    <Tab.Screen name="Cabinet" component={CabinetScreen} />
  </Tab.Navigator>
)