import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { commonStyle } from "../styles/common.style";
import Loader from "../components/loader.component";
import Empty from "../components/empty.component";
import { useLink } from "../hooks/links.hook";
import { useHttp } from "../hooks/http.hook";
import { Button } from "react-native-elements";
import { Text, TouchableOpacity, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ScheduleScreen({ navigation }) {
  const [schedule, setSchedule] = useState(null)
  const { loading, request } = useHttp()
  const auth = useContext(AuthContext)
  const { Links } = useLink()

  const dataLoading = useCallback(async () => {
    try {
      let response = await request(
        Links.ScheduleLink,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId,
          device_id: auth.deviceId
        }
      );
      console.log("Token", auth.token);
      if (response && response.data) {
        setSchedule(response.data)
      }
    } catch (err) {
      console.log("Schedule screen reports:", err.message);
    }
  }, [request, Links, auth])

  const reloadSchedule = useCallback(async () => {
    try {
      await request(Links.ScheduleRefreshLink, "POST",
        {
          token: auth.token,
          user_id: auth.userId,
          device_id: auth.deviceId
        }
      )
    } catch (error) {

    }
  }, [request, auth, Links])

  const Refresh = async () => {
    reloadSchedule()
    dataLoading()
  }

  useEffect(() => {
    dataLoading();
    return () => { }
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }

  if (!schedule) {
    return <Empty />
  }

  const RenderSchedule = ({ schedule }) => {
    return (<View style={{ flexDirection: "row" }}>
      {schedule.map((element, index) => {
        let color, icon, pressable = true;
        console.log("Log", element.id)
        switch (element.status) {
          case "complete":
            color = "lightgreen"
            icon = "checkmark"
            break;
          case "inProgress":
            color = "yellow"
            icon = "code-slash"
            break;
          case "overdue":
            color = "coral"
            icon = "alert"
            break;
          case "unavailable":
            color = "lightgrey"
            icon = "lock-closed"
            pressable = false
            break;
        }
        const style = {
          width: 35,
          height: 35,
          backgroundColor: color,
          marginRight: 7,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center"
        }
        return (
          <TouchableOpacity
            style={style}
            onPress={() => { if (pressable) { navigation.navigate("Lesson", { lesson_id: element.id }) } }}
          >
            <Ionicons name={icon} size={20} />
          </TouchableOpacity>
        )
      }
      )}
    </View>)
  }

  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer, commonStyle.FullHight]}>
        <View style={commonStyle.Card}>
          {schedule?.map((element, index) => (
            <View>
              <Text style={{ padding: 5, marginVertical: 5, borderRadius: 5, color: "white", fontSize: 20, backgroundColor: "#6786DA" }}>{element.course_name}</Text>
              <RenderSchedule schedule={element.schedule} />
            </View>
          ))}
          <View>
            <Button
              title={"Refresh"}
              onPress={Refresh}
            />
          </View>
        </View>
      </View>
    </View>
  );
}