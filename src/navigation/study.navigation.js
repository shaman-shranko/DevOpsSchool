import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StudyScreen from '../screens/Study/StudyScreen';
import PlanScreen from '../screens/Study/PlanScreen';
import TopicScreen from '../screens/Study/TopicScreen';
import LessonScreen from '../screens/Study/LessonScreen';

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
        name="Plan"
        component={PlanScreen}
        options={({ route }) => ({ title: (route && route.params && route.params.name) ?? "Plan" })}
      />
      <StudyStack.Screen
        name="Topic"
        component={TopicScreen}
        options={({ route }) => ({ title: (route && route.params && route.params.name) ?? "Topic" })}
      />
      <StudyStack.Screen
        name="Lesson"
        component={LessonScreen}
        options={({ route }) => ({ title: (route && route.params && route.params.name) ?? "Lesson" })}
      />
    </StudyStack.Navigator>
  );
}