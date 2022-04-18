import React, { useContext } from "react";
import { Image, Text, View } from 'react-native'
import { commonStyle } from "../styles/common.style";
import { Button } from 'react-native-elements'
import { AuthContext } from "../context/auth.context";

export default function CabinetScreen({ navigation }) {
  const auth = useContext(AuthContext)
  // const { ready, logout } = useContext(AuthContext)


  return (
    <View style={commonStyle.Container}>
      <View style={{ width: "100%", padding: 20, height: "100%" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 20, height: "100%" }}>

          {/* Image */}
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: 'lightgrey'
              }}
              resizeMode={"contain"}
              source={require("../assets/person.png")}
            />
          </View>

          <View style={{ paddingVertical: 20 }}>
            <Text style={{ fontSize: 24, textAlign: "center" }}>
              Dima Hlushchuk
            </Text>
            <Text style={{ textAlign: "center" }}>
              dmitriy.h@avega-group.com
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              buttonStyle={{ width: 150 }}
              title={'Start learning'}
              onPress={() => { navigation.navigate("Study") }}
            />
            <Button
              buttonStyle={{ width: 150, backgroundColor: "green" }}
              title={'Buy course'}
              onPress={() => { navigation.navigate("Course") }}
            />
          </View>
          <View style={{ marginVertical: 20, alignItems: "center" }}>
            <Button
              title={'Logout'}
              buttonStyle={{ width: 150 }}
              onPress={() => { auth.logout() }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}