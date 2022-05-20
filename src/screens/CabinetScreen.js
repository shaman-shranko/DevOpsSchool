import React, { useCallback, useContext, useState, useEffect } from "react";
import { Image, ScrollView, Text, View } from 'react-native';
import { commonStyle } from "../styles/common.style";
import { AuthContext } from "../context/auth.context";
import { CheckBox, Button, Input } from 'react-native-elements';
import { useHttp } from '../hooks/http.hook'
import { useLink } from '../hooks/links.hook'
import Loader from "../components/loader.component";

export default function CabinetScreen({ navigation }) {
  const { request, loading } = useHttp();
  const [schedule, setSchedule] = useState(
    [
      { day: 1, active: true, lessons: "0" },
      { day: 2, active: true, lessons: "0" },
      { day: 3, active: true, lessons: "0" },
      { day: 4, active: true, lessons: "0" },
      { day: 5, active: true, lessons: "0" },
      { day: 6, active: true, lessons: "0" },
      { day: 7, active: true, lessons: "0" }
    ]
  )
  const auth = useContext(AuthContext)
  const { Links } = useLink()
  const { userData, userId, deviceId, token } = auth

  useEffect(() => {
    if (auth?.userData?.school_days != null) {
      setSchedule(JSON.parse(auth.userData.school_days))
    }
  }, [auth])

  const dayName = (number) => {
    return ["Пн", "Вт", "Ср", "Пт", "Чт", "Сб", "Вс"][number - 1]
  }

  const toggleActive = index => {
    let buf = schedule;
    buf[index].active = !schedule[index].active
    setSchedule([...buf])
  }

  const changeLessons = (index, count) => {
    let buf = schedule;
    buf[index].lessons = count
    setSchedule([...buf])
  }

  const saveSchedule = useCallback(async () => {
    try {
      let response = await request(
        Links.SetActiveDaysLink,
        "POST",
        {
          device_id: deviceId,
          user_id: userId,
          token,
          school_days: JSON.stringify(schedule)
        }
      )
    } catch (error) {
      console.log("Save schedule error:", error.message);
    }
  }, [request, schedule, Links])

  if (loading) {
    return <Loader />
  }

  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer, { height: "100%" }]}>
        <View style={commonStyle.Card}>
          <ScrollView>
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
                {userData?.first_name ?? "Hi, "} {userData?.last_name ?? "Newbie"}
              </Text>
              <Text style={commonStyle.TextCenter}>
                {userData?.email ?? "your@email.com"}
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
              <Button
                title={'Logout'}
                buttonStyle={commonStyle.W150}
                onPress={() => { auth.logout() }}
              />
            </View>
            {/* Schedule */}
            <View>
              <Text style={{ fontSize: 16, color: "#3e3e3e", textAlign: "center", paddingVertical: 5 }}>
                Расписание
              </Text>
              <View>
                {schedule?.map((element, index) => (
                  <View style={{ flexDirection: "row", height: 42, paddingVertical: 2 }} key={`schedule_${index}`}>
                    <View style={{ flex: 1 }}>
                      <CheckBox
                        title={dayName(element.day)}
                        checked={schedule[index].active}
                        size={28}
                        containerStyle={{ padding: 5, margin: 0, marginLeft: 0, marginRight: 0, borderWidth: 0 }}
                        onPress={() => { toggleActive(index) }}
                      />
                    </View>
                    <View style={{ flex: 3 }}>
                      <Input
                        value={element.lessons}
                        onChangeText={(value) => { changeLessons(index, value) }}
                        containerStyle={{ height: 10 }}
                        keyboardType='numeric'
                      />
                    </View>
                  </View>
                ))}
              </View>
              {/* Logout button */}
              <View style={[commonStyle.PV20, commonStyle.Centered]}>
                <Button
                  title={'Save'}
                  buttonStyle={commonStyle.W150}
                  onPress={saveSchedule}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}