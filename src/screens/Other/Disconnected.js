import React from "react";
import { Image, Text, View } from 'react-native';
import { Button } from "react-native-elements";

export default function Disconnected(props) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 7, alignItems: "center", justifyContent: "center" }}>
        <Image
          resizeMode={"contain"}
          source={require("../../assets/disconnected.png")}
        />
        <Text style={{ color: "#3e3e3e", textAlign: "center", fontSize: 20, paddingVertical: 10, fontWeight: "bold" }}>Нет соединения с интернетом</Text>
        <Text style={{ color: "#3e3e3e", textAlign: "center", fontSize: 15, lineHeight: 24 }}>Пожалуйста проверьте ваше интернет соединение и попробуйте еще раз</Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 10 }}>
        <Button
          title={"Попробовать снова"}
          buttonStyle={{ padding: 10, marginTop: 10, borderRadius: 10, backgroundColor: '#6786DA' }}
          onPress={() => { props.refresh() }}
        />
      </View>
    </View>
  )
}