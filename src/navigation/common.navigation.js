import React from 'react';
import StudyNavigation from './study.navigation';
import CourseScreen from '../screens/CourseScreen';
import CabinetScreen from '../screens/CabinetScreen';
import ScheduleScreen from '../screens/ScheduleScreen';

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
        } else if (route.name === 'Schedule') {
          iconName = focused
            ? 'calendar'
            : 'calendar-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarLabelStyle: {
        fontSize: 14,
      },
      tabBarActiveTintColor: '#6786DA',
      tabBarInactiveTintColor: 'gray',

      headerStyle: {
        backgroundColor: '#6786DA',
      },
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },

    })}>
    <Tab.Screen options={{ headerShown: false }} name="Study" component={StudyNavigation} />
    <Tab.Screen name="Course" component={CourseScreen} />
    <Tab.Screen name="Schedule" component={ScheduleScreen} />
    <Tab.Screen name="Cabinet" component={CabinetScreen} />
  </Tab.Navigator>
)