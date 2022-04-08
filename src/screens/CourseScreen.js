import React from "react";
import { Text, View } from 'react-native'
import { commonStyle } from "../styles/common.style";

export default function CourseScreen() {
  return (
    <View style={commonStyle.Container}>
      <Text>
        Course Screen!
      </Text>
    </View>
  );
}