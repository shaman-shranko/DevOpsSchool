import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StudyScreen from '../screens/Study/StudyScreen';
import PlansScreen from '../screens/Study/PlansScreen';
import PlanScreen from '../screens/Study/PlansScreen';
import LessonScreen from '../screens/Study/LessonScreen';
import TestScreen from '../screens/Study/TestScreen';

const StudyStack = createNativeStackNavigator();

export default function StudyStackScreen() {
  return (
    <StudyStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6786DA',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <StudyStack.Screen
        name="General"
        component={StudyScreen}
        options={{ title: "Study" }}
      />
      <StudyStack.Screen
        name="Plans"
        component={PlansScreen}
        options={({ route }) => ({ title: (route && route.params && route.params.name) ?? "Plan" })}
      />
      <StudyStack.Screen
        name="Plan"
        component={PlanScreen}
        options={({ route }) => ({ title: (route && route.params && route.params.name) ?? "Topic" })}
      />
      <StudyStack.Screen
        name="Lesson"
        component={LessonScreen}
        options={({ route }) => ({ title: (route && route.params && route.params.name) ?? "Lesson" })}
      />
      <StudyStack.Screen
        name="Test"
        component={TestScreen}
        options={({ route }) => ({ title: (route && route.params && route.params.name) ?? "Test" })}
      />
    </StudyStack.Navigator>
  );
}