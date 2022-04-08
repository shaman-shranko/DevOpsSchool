import React from "react";
import { Button, Text, View } from 'react-native'
import { commonStyle } from "../styles/common.style";

export default function CabinetScreen({ navigation }) {
  return (
    <View style={commonStyle.Container}>
      <View style={{ width: "100%", padding: 20, height: "100%" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 20, height: "100%" }}>

          <Text>
            Cabinet Screen!
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              style={{ width: 350 }}
              title={'Start learning'}
              onPress={() => { navigation.navigate("Study") }}
            />
            <Button
              style={{ width: 350 }}
              title={'Buy course'}
              color={'green'}
              onPress={() => { navigation.navigate("Course") }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}