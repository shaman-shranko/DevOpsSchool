import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StudyScreen from '../screens/Study/StudyScreen';
import SingleScreen from '../screens/Study/SingleScreen';
import LessonScreen from '../screens/Study/LessonScreen';

const StudyStack = createNativeStackNavigator();

export default function StudyStackScreen() {
  return (
    <StudyStack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <StudyStack.Screen name="General" component={StudyScreen} />
      <StudyStack.Screen name="Topic" component={SingleScreen} />
      <StudyStack.Screen name="Lesson" component={LessonScreen} />

    </StudyStack.Navigator>
  );
}