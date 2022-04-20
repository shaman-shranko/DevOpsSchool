import ErrorMessage from "../../components/ErrorMessage";
import { commonStyle } from "../../styles/common.style";
import { Button, Input } from "react-native-elements";
import React, { useCallback, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { Text, View } from 'react-native'
import { Links } from "../../constants";

export default function SignUpScreen({ navigation }) {

  const model = "models\\usersModel_S_USERS_ASSIGN_CREATE_";

  const { loading, request, error, errors } = useHttp();
  const [form, setForm] = useState({
    email: null,
    pass: null,
    device_id: "shaman_phone"
  })
  const { URLS, URL } = Links()

  const signUpAsync = useCallback(async () => {
    try {
      console.log("Form", form);
      let response = await request(URL + URLS.SignUpLink, "POST", form)
    } catch (err) {

    }
  }, [request, form, URL])

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
            onChangeText={(value) => { setForm({ ...form, email: value }) }}
            errorMessage={errors && errors[model + 'email']}
            keyboardType="email-address"
            placeholder="Email"
            value={form.email}
          />
          <Input
            onChangeText={(value) => { setForm({ ...form, pass: value }) }}
            errorMessage={errors && errors[model + 'pass']}
            placeholder="Пароль"
            value={form.pass}
            secureTextEntry
          />
        </View>
        {/* Button */}
        <View style={{ marginTop: 10 }}>
          <Button
            buttonStyle={{ marginHorizontal: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "blue" }}
            onPress={signUpAsync}
            title={"Создать аккаунт"}
            disabled={loading}
            type='outline'
          />
        </View>
      </View>

      <View style={{ flex: 1, width: "100%", justifyContent: "center", paddingHorizontal: 20 }}>
        <Button
          buttonStyle={{ marginHorizontal: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "blue" }}
          onPress={() => { navigation.navigate("Login") }}
          title={"У меня есть аккаунт"}
          disabled={loading}
          type='outline'
        />
      </View>
      {error && <ErrorMessage error={error} />}
    </View>
  )
}