import React from 'react';
import { Text, View } from 'react-native';

export default ErrorMessage = ({ error }) => {
  return (
    <View style={{ padding: 5, backgroundColor: "red", width: "100%" }}>
      <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
        {error}
      </Text>
    </View>
  )
}