
import React, { useState, useCallback, useContext } from "react";
import { Button, Input } from "react-native-elements";
import { commonStyle } from "../../styles/common.style";
import { Text, TouchableOpacity, View } from 'react-native'
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/auth.context";
import { Links } from "../../constants";

export default function LoginScreen({ navigation }) {

  const { loading, errors, request } = useHttp();
  const auth = useContext(AuthContext)


  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const loginAsync = useCallback(async () => {
    try {
      const form = {email,password}
      let response = await request(Links.LoginLink, "POST", form)
      auth.login(response);
    } catch (error) {

    }
  }, [request,email,password])

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
            value={email}
            onChangeText={(value) => { setEmail(value) }}
            placeholder="Email"
            keyboardType="email-address"
            disabled={loading}
            errorMessage={errors && errors.email}
          />
          <Input
            value={password}
            onChangeText={(value) => { setPassword(value) }}
            placeholder="Пароль"
            errorMessage={errors && errors.password}
            disabled={loading}
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
            onPress={() => { loginAsync() }}
            disabled={loading}
            title={"Войти"}
            type='outline'
          />
        </View>
      </View>

      <View style={{ flex: 1, width: "100%", justifyContent: "center", paddingHorizontal: 20 }}>
        <Button
          buttonStyle={{ marginHorizontal: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "blue" }}
          title={"Создать аккаунт"}
          disabled={loading}
          type='outline'
          onPress={() => { navigation.navigate("SignUp") }}
        />
      </View>

    </View>
  )
}