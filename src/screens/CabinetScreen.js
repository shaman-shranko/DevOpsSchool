import React, { useContext } from "react";
import { Button } from 'react-native-elements';
import { Image, Text, View } from 'react-native';
import { commonStyle } from "../styles/common.style";
import { AuthContext } from "../context/auth.context";

export default function CabinetScreen({ navigation }) {
  const auth = useContext(AuthContext)

  return (
    <View style={commonStyle.Container}>
      <View style={commonStyle.CardContainer}>
        <View style={commonStyle.Card}>
          {/* Image */}
          <View style={commonStyle.Centered}>
            <Image
              style={commonStyle.Avatar}
              resizeMode={"contain"}
              source={require("../assets/person.png")}
            />
          </View>
          {/* Name and email */}
          <View style={commonStyle.PV20}>
            <Text style={commonStyle.TitleText}>
              Dima Hlushchuk
            </Text>
            <Text style={commonStyle.TextCenter}>
              dmitriy.h@avega-group.com
            </Text>
          </View>
          {/* Start learn and buy buttons */}
          <View style={commonStyle.CabinetButtons}>
            <Button
              buttonStyle={commonStyle.W150}
              title={'Start learning'}
              onPress={() => { navigation.navigate("Study") }}
            />
            <Button
              buttonStyle={[commonStyle.W150, commonStyle.BuyButton]}
              title={'Buy course'}
              onPress={() => { navigation.navigate("Course") }}
            />
          </View>
          {/* Logout button */}
          <View style={[commonStyle.PV20, commonStyle.Centered]}>
            <Button
              title={'Logout'}
              buttonStyle={commonStyle.W150}
              onPress={() => { auth.logout() }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}