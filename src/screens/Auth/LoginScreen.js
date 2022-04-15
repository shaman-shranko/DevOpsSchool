
import React, { useState } from "react";
import { Button, Input } from "react-native-elements";
import { commonStyle } from "../../styles/common.style";
import { Text, TouchableOpacity, View } from 'react-native'

export default function LoginScreen({ navigation }) {

  const [form, setForm] = useState({
    email: null,
    password: null,
  })
  return (
    <View style={commonStyle.AuthContainer}>

      <View style={{ flex: 4, width: "100%", paddingHorizontal: 20 }}>
        {/* Greeting text */}
        <View style={{ alignItems: "center", marginTop: 100, marginBottom: 50 }}>
          <Text style={{ fontSize: 28, lineHeight: 40, fontWeight: 'bold', color: "black" }}>
            Привет!
          </Text>
          <Text style={{ fontSize: 18, lineHeight: 30, fontWeight: 'bold', color: "black" }}>
            Рады снова видеть вас
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
          <View style={{ width: "100%", alignItems: "flex-end", paddingHorizontal: 10, marginBottom: 20 }}>
            <TouchableOpacity onPress={() => { navigation.navigate('Forgot') }}>
              <Text style={{ fontSize: 16, color: "blue" }}>
                Забыли пароль?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Button */}
        <View style={{ marginTop: 10 }}>
          <Button
            buttonStyle={{ marginHorizontal: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "blue" }}
            title={"Войти"}
            type='outline'
          />
        </View>
      </View>

      <View style={{ flex: 1, width: "100%", justifyContent: "center", paddingHorizontal: 20 }}>
        <Button
          buttonStyle={{ marginHorizontal: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "blue" }}
          title={"Создать аккаунт"}
          type='outline'
          onPress={() => { navigation.navigate("SignUp") }}
        />
      </View>

    </View>
  )
}