import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { commonStyle } from "../../styles/common.style";
import { useLink } from "../../hooks/links.hook";
import { useHttp } from "../../hooks/http.hook";
import { ScrollView, View } from 'react-native'
import Loader from "../../components/Loader";
import Empty from "../../components/Empty";
import Topic from "../../components/Topic";

export default function PlanScreen({ navigation, route }) {
  const { loading, error, errors, request } = useHttp();
  const [lessons, setLessons] = useState(null)
  const auth = useContext(AuthContext)
  const { Links } = useLink()

  const dataLoading = useCallback(async () => {
    try {
      let course_id = route?.params?.course_id ?? 0
      let response = await request(
        Links.PlanLink + course_id,
        "POST",
        {
          token: auth.token,
          user_id: auth.userId
        }
      );
      if (response && response.data) {
        setLessons(response.data)
      }
    } catch (err) {
      console.log("Plan screen reports:", err.message);
    }
  }, [request, Links])

  useEffect(() => {
    dataLoading();
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }

  if (!lessons) {
    return <Empty />
  }

  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer, commonStyle.FullHight]}>
        <ScrollView style={commonStyle.MB0}>
          {lessons && Object.values(lessons).map((element, index) => (
            <Topic data={element} navigation={navigation} index={index + 1} key={`lesson_${index}`} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}