import React, { useState, useEffect, useCallback } from "react";
import { commonStyle } from "../../styles/common.style";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import Topic from "../../components/Topic";
import { ScrollView, Text, View } from 'react-native'

export default function SingleScreen({ navigation }) {
  const { loading, request } = useHttp();
  const [lessons, setLessons] = useState(null)

  const dataLoading = useCallback(async () => {
    try {
      let response = await request('http://192.168.0.113:5000/api/devops/lessons');
      setLessons(response)
    } catch (err) {
      console.log("Lessons screen reports:", err.message);
    }
  }, [request])

  useEffect(() => {
    dataLoading();
  }, [dataLoading])

  if (loading) {
    return <Loader />
  }
  return (
    <View style={commonStyle.Container}>
      <View style={[commonStyle.CardContainer, { height: "100%" }]}>
        <ScrollView style={{ marginBottom: 0 }}>
          {lessons && lessons.map((element, index) => (
            <Topic data={element} navigation={navigation} index={index + 1} key={`lesson_${index}`} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}