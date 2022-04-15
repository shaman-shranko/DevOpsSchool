
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { commonStyle } from "../../styles/common.style";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'

export default function ForgotScreen({ navigation }) {

  const [email, setEmail] = useState(null)
  return (
    <View style={commonStyle.AuthContainer}>

      <View style={{ flex: 7, width: "100%", paddingHorizontal: 20 }}>
        {/* Greeting text */}
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18, lineHeight: 30, fontWeight: 'bold', color: "black" }}>
            Восстановление пароля
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 100 }}>
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            resizeMode={"contain"}
            source={require("../../assets/key.png")}
            onLoad={() => (<ActivityIndicator size={40} color={"red"} />)}
          />
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 28, lineHeight: 80, fontWeight: 'bold', color: "black" }}>
              Введите email
            </Text>
            <Text style={{ fontSize: 18, lineHeight: 30, fontWeight: 'bold', color: "black" }}>
              Введите email для сброса пароля
            </Text>
          </View>
        </View>
        <Input
          value={email}
          onChangeText={(value) => { setEmail(value) }}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>

      <View style={{ flex: 1, width: "100%", justifyContent: "space-between", alignItems: "center", padding: 50 }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Forgot') }}>
          <Text>
            Сбросить пароль
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
          <Text>
            Нет, спасибо
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}