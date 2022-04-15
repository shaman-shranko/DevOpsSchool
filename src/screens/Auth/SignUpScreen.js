
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { commonStyle } from "../../styles/common.style";
import { Text, TouchableOpacity, View } from 'react-native'

export default function SignUpScreen({ navigation }) {

  const [form, setForm] = useState({
    email: null,
    password: null,
  })
  return (
    <View style={commonStyle.AuthContainer}>

      <View style={{ flex: 4, width: "100%", paddingHorizontal: 20 }}>
        {/* Greeting text */}
        <View style={{ alignItems: "center", marginTop: 100, marginBottom: 50 }}>
          <Text style={{ fontSize: 18, lineHeight: 30, fontWeight: 'bold', color: "black" }}>
            Самое время
          </Text>
          <Text style={{ fontSize: 18, lineHeight: 30, fontWeight: 'bold', color: "black" }}>
            Присоединиться к клубу!
          </Text>
        </View>
        {/* Inputs */}
        <View style={{ padding: 0 }}>
          <Input
            value={form.email}
            onChangeText={(value) => { setForm({ ...form, email: value }) }}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Input
            value={form.password}
            onChangeText={(value) => { setForm({ ...form, password: value }) }}
            placeholder="Пароль"
            secureTextEntry
          />
        </View>
        {/* Button */}
        <View style={{ marginTop: 10 }}>
          <Button
            buttonStyle={{ marginHorizontal: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "blue" }}
            title={"Создать аккаунт"}
            type='outline'
          />
        </View>
      </View>

      <View style={{ flex: 1, width: "100%", justifyContent: "center", paddingHorizontal: 20 }}>
        <Button
          buttonStyle={{ marginHorizontal: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "blue" }}
          title={"У меня есть аккаунт"}
          onPress={() => { navigation.navigate("Login") }}
          type='outline'
        />
      </View>

    </View>
  )
}